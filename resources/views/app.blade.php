<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>curator9</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="/images/favicon.png">

{{--    <link href="{{ mix('css/app.css') }}" rel="stylesheet">--}}
</head>
<body>

<div id="app"></div>

<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
