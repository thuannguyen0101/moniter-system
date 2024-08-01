import telepot
from flask import Flask, request, jsonify
from datetime import datetime
import logging
import re
from threading import Timer  # Thêm dòng này để nhập khẩu Timer
from collections import defaultdict

app = Flask(__name__)

# Thay thế bằng token và chat ID của bạn
TELEGRAM_BOT_TOKEN = '7213774667:AAG3IaZl822wEw5RuSUrZ5jMfgz2sjqszk8'
TELEGRAM_CHAT_ID = 5714270447
bot = telepot.Bot(TELEGRAM_BOT_TOKEN)

# Thiết lập logging
logging.basicConfig(level=logging.DEBUG)

# Lưu trữ cảnh báo tạm thời
alerts = defaultdict(lambda: defaultdict(list))

def escape_markdown(text):
    """Escape special characters in MarkdownV2"""
    escape_chars = r'_*\[\]()~`>#+-=|{}.!'
    return re.sub(f'([{re.escape(escape_chars)}])', r'\\\1', text)

def send_telegram_message(message):
    try:
        bot.sendMessage(TELEGRAM_CHAT_ID, message, parse_mode='MarkdownV2')
    except Exception as e:
        logging.error(f"Error sending message to Telegram: {e}")

def format_alert(alerts):
    """Format multiple alerts into a single message"""
    messages = []
    for device, alert_list in alerts.items():
        for alert_type, alert_details in alert_list.items():
            if alert_details:
                # Chỉ lấy thông báo đầu tiên của loại cảnh báo
                alert = alert_details[0]
                status = alert.get('status', 'unknown')
                labels = alert.get('labels', {})
                annotations = alert.get('annotations', {})
                startsAt = alert.get('startsAt', 'unknown time')
                endsAt = alert.get('endsAt', 'unknown time')

                try:
                    start_time = datetime.strptime(startsAt, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S')
                    end_time = datetime.strptime(endsAt, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d %H:%M:%S') if endsAt else 'N/A'
                except Exception as e:
                    logging.error(f"Error parsing date: {e}")
                    start_time = startsAt
                    end_time = endsAt

                message = f"""
*Alert Name*: {escape_markdown(labels.get('alertname', 'unknown'))}
*Status*: {escape_markdown(status)}
*Instance*: {escape_markdown(labels.get('instance', 'unknown'))}
*Severity*: {escape_markdown(labels.get('severity', 'unknown'))}
*Description*: {escape_markdown(annotations.get('description', 'No description'))}
*Summary*: {escape_markdown(annotations.get('summary', 'No summary'))}
*Start Time*: {escape_markdown(start_time)}
*End Time*: {escape_markdown(end_time)}
"""
                messages.append(message.strip())
    return "\n\n".join(messages)

def send_grouped_alerts():
    global alerts
    if alerts:
        # Gộp tất cả các cảnh báo thành một thông báo
        message = format_alert(alerts)
        send_telegram_message(message)
        # Xóa danh sách cảnh báo sau khi gửi
        alerts = defaultdict(lambda: defaultdict(list))

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        data = request.json
        logging.debug(f"Received data: {data}")
        new_alerts = data.get('alerts', [])
        
        # Thêm các cảnh báo mới vào danh sách cảnh báo
        for alert in new_alerts:
            instance = alert.get('labels', {}).get('instance', 'unknown')
            alert_name = alert.get('labels', {}).get('alertname', 'unknown')
            alerts[instance][alert_name].append(alert)
        
        # Thay đổi thời gian này tùy thuộc vào nhu cầu của bạn
        Timer(60, send_grouped_alerts).start()
        
        return jsonify({"message": "alerts received"}), 200
    except Exception as e:
        logging.error(f"Error processing webhook: {e}")
        return jsonify({"message": "internal server error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
