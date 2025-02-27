<?php

$dropzone = $waxed->setter('Dropzone');
$dropzone = $dropzone->setUrl('/waxed/upload')//->setAcceptedFiles('.jpg,.mp3,.mp4')
->setHeaders([
  'alfa' => '1UI2UOI2',
  'beta' => '2UI2UOI2',
])
->setChunking(true)->setChunkSize(1000000)
->setMaxFilesize(50000)
->setExistingFiles([
  ['name'=>'kvik.txt','thumbnail'=>null],
  ['id' => '2UI2UOI2','name'=>'kroch.txt','size'=>1230,'thumbnail'=>'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAHNJREFUKJHd0kEOgkAQRNHXxKtwCi+gXsitS88J3qPYYDKQQMClndRm8n86U2l4YETWSQKvJL6xBTdCWskWvBKCdxIXx+dZVftCVV2T1OJtXnd4ujPwTwLLZvq287mlvmVO/+EfNnT4nOBHuGOwc4RzBtwmQFR96cxv3/4AAAAASUVORK5CYII='],
])->func();

return [
  'payload1' => $dropzone(null),
];


return [
'payload1' =>
  [
    'acceptedFiles' => '.mp3,.mp4',
    'ignoreHiddenFiles' => false,
    'maxFilesize' => 500,
    'headers' => [
      'alfa' => '1UI2UOI2',
      'beta' => '2UI2UOI2',
    ],
  ],
];

