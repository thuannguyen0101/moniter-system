<!DOCTYPE html>
<html lang="en">
<head>
    <title>Generate json</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

</head>
<body>

<div class="jumbotron text-center">
    <h1>Generate json</h1>
</div>

<div class="container">
    <form>
        <div class="form-group">
            <label for="form-id_number">ID number</label>
            <input type="number" required class="form-control" name="id_number" id="form-id_number">
        </div>
        <div class="form-group">
            <label for="form-ip">Instance</label>
            <input type="text" name="ip_address" required class="form-control" id="form-ip_address">
        </div>
        <div class="form-group">
            <label for="form-dns">Show hostname</label>
            <input type="text" name="domain" required class="form-control" id="form-dns">
        </div>
        <div class="form-group">
            <label for="form-col_span">Col span</label>
            <input type="number" name="col_span" required class="form-control" id="form-col_span">
        </div>
        <button type="button" id="generate" class="btn btn-primary">Submit</button>
    </form>
    <div class="form-group mt-2">
        <textarea class="form-control" id="output" rows="20" cols="50"></textarea>
    </div>
</div>

</body>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
<script src="{{ mix('js/generate.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</html>
