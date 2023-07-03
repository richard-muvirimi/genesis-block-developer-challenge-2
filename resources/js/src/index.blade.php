<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <base href="{{ rtrim(config('app.url'), '/') . '/' }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="/src/favicon.ico">
</head>
<body>
<app-root></app-root>
<noscript>Please enable JavaScript to continue using this application.</noscript>
</body>
</html>
