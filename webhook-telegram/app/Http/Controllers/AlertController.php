<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Api;
use Telegram\Bot\Exceptions\TelegramSDKException;

class AlertController extends Controller
{
    protected $telegram;

    /**
     * @throws TelegramSDKException
     */
    public function __construct()
    {
        $this->telegram = new Api(config('webhook-telegram.telegram.token'));
    }

    public function webhook(Request $request): JsonResponse
    {
        try {
            $data = $request->json()->all();
            Log::debug("Received data: " . json_encode($data));

            $alerts          = $data['alerts'] ?? [];
            $formattedAlerts = $this->formatAlerts($alerts);
            if (!empty($formattedAlerts)) {
                $this->sendTelegramMessage($formattedAlerts);
            }

            return response()->json(['message' => 'alerts received'], 200);
        } catch (\Exception $e) {
            Log::error("Error processing webhook: " . $e->getMessage());
            return response()->json(['message' => 'internal server error'], 500);
        }
    }

    protected function sendTelegramMessage($message)
    {
        try {
            $this->telegram->sendMessage([
                'chat_id'    => config('webhook-telegram.telegram.chat_id'),
                'text'       => $message,
                'parse_mode' => 'MarkdownV2'
            ]);
        } catch (\Exception $e) {
            Log::error("Error sending message to Telegram: " . $e->getMessage());
        }
    }

    protected function formatAlerts($alerts): string
    {
        $messages = [];

        foreach ($alerts as $alert) {
            $status      = $alert['status'] ?? 'unknown';
            $labels      = $alert['labels'] ?? [];
            $annotations = $alert['annotations'] ?? [];
            $startsAt    = $alert['startsAt'] ?? 'unknown time';
            $endsAt      = $alert['endsAt'] ?? 'unknown time';

            $startTime = $this->formatDate($startsAt);
            $endTime   = $this->formatDate($endsAt);

            $statusEmoji = $this->getStatusEmoji($status);
            $details     = [
                'description' => $annotations['description'] ?? 'No description',
                'summary'     => $annotations['summary'] ?? 'No summary'
            ];

            $infos = array_filter($labels, function ($key) {
                return !in_array($key, ['alertname', 'severity', 'instance', 'job']);
            }, ARRAY_FILTER_USE_KEY);

            if (!empty($infos)) {
                $details = array_merge($details, $infos);
            }
            $detailMessage = '';
            foreach ($details as $key => $value) {
                $detailMessage .= "\n     - $key: $value";
            }

            $message    = "
*Alert Name*: " . $this->escapeMarkdown($labels['alertname'] ?? 'unknown') . "
*Status*: " . $statusEmoji . " " . $this->escapeMarkdown($status) . "
*Instance*: " . $this->escapeMarkdown($this->mappingInstanceDNS($labels['instance'] ?? 'unknown')) . "
*Severity*: " . $this->escapeMarkdown($this->getSeverityIcon($labels['severity'] ?? 'unknown')) . "
*Details*: " . $this->escapeMarkdown($detailMessage) . "
*Start Time*: " . $this->escapeMarkdown($startTime) . "
*End Time*: " . $this->escapeMarkdown($endTime);
            $messages[] = trim($message);
        }

        return implode("\n\n", $messages);
    }

    protected function formatDate($date): string
    {
        try {
            return Carbon::parse($date)->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            Log::error("Error parsing date: " . $e->getMessage());
            return $date;
        }
    }

    protected function getStatusEmoji($status): string
    {
        switch ($status) {
            case 'firing':
                return '🔴';
            case 'resolved':
                return '✅';
            default:
                return '⚠️';
        }
    }

    protected function getSeverityIcon($severity): string
    {
        switch ($severity) {
            case 'critical':
                return '🔥 ' . $severity . ' 🔥';
            case 'warning':
                return '⚠️ ' . $severity . ' ⚠️';
            case 'info':
                return 'ℹ️ ' . $severity . ' ℹ️';
            case 'resolved':
                return '✅ ' . $severity . '✅ ';
            default:
                return '❓ ' . $severity . ' ❓';
        }
    }

    protected function escapeMarkdown($text)
    {
        $escapeChars = '_*\[\]()~`>#+-=|{}.!';
        return preg_replace('/([' . preg_quote($escapeChars, '/') . '])/', '\\\\$1', $text);
    }

    protected function mappingInstanceDNS($instance): string
    {
        $instance = strtok($instance, ':');
        $arrayDNS = [
            '210.245.74.97' => 'spider.offerjob.vn',
            '172.16.238.4'  => 'Local',
        ];
        if (isset($arrayDNS[$instance])) {
            return $arrayDNS[$instance] . " | IP: $instance";
        }
        return 'unknown';
    }
}
