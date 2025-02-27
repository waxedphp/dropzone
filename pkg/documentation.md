# Dropzone

DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.

It’s lightweight, doesn’t depend on any other library (like jQuery) and is highly customizable.

[https://www.dropzonejs.com]

MIT license

---

#### PHP:

```php
  use \Waxedphp\Dropzone\Setter as Dropzone;

  $obj = new Dropzone($this->waxed);

  $obj = $obj->setUrl('/upload')
  ->setAcceptedFiles('.jpg,.mp3,.mp4')
  ->setHeaders([
    'alfa' => '1UI2UOI2',
    'beta' => '2UI2UOI2',
  ])
  ->setChunking(true)->setChunkSize(1000000)
  ->setMaxFilesize(50000)
  ->setExistingFiles([
    ['name'=>'kvik.txt','thumbnail'=>null],
    ['id' => '2UI2UOI2','name'=>'kroch.txt','thumbnail'=>null],
  ]);

  $this->waxed->pick('section1')->display([
    'payload1' => $obj->value(),
  ],$this->tpl.'/dropzone'); 

```

#### PHP Upload part:

```php
  use \Waxedphp\Dropzone\Uploader as DropzoneUploader;
  
  $u = new DropzoneUploader();
  $u->setWritablePath(getenv('UPLOAD_WRITABLE'));
  $u->dispatch();

```

---
#### HTML:

```html
<div class="waxed-dropzone" data-route="{{route}}" >


</div>

```

#### CSS:

```css
.waxed-dropzone {
  border-style:dashed;
  border-color:#909090;
  border-width:1px;
  overflow:hidden;
  min-height:300px;  
  background-color:#202020;
  margin-top:30px;
  margin-bottom:50px;
}
.waxed-dropzone.dropzone 
  .dz-preview.dz-image-preview {
  background-color:#202020;
}
.waxed-dropzone.dropzone
  .dz-preview .dz-image {
  border-radius:5px;
}
```


---
---

#### PHP Setter methods:

```php
  use \Waxedphp\Dropzone\Setter as Dropzone;

  $obj = new Dropzone($this->waxed);

  $obj->setUrl('/upload');
  //Has to be specified on elements other than form
  //(or when the form doesn't have an action attribute).
  
  $obj->setAcceptedFiles('.jpg,.mp3,.mp4');
  
  $obj->setHeaders([
    'alfa' => '1UI2UOI2',
    'beta' => '2UI2UOI2',
  ]);
  
  $obj->setChunking(true);
  
  $obj->setChunkSize(1000000);
  
  $obj->setMaxFilesize(50000);
  
  $obj->setExistingFiles([
    ['name'=>'kvik.txt','thumbnail'=>null],
    ['id' => '2UI2UOI2','name'=>'kroch.txt','thumbnail'=>null],
  ]);
  
  $obj->setMethod();
  //"post", Can be changed to "put" if necessary.
  
  $obj->setWithCredentials();
  //false|Will be set on the XHRequest.
  
  $obj->setTimeout();
  //null, The timeout for the XHR requests in milliseconds (since v4.4.0).
  //If set to null or 0, no timeout is going to be set.
  
  $obj->setParallelUploads(5);
  //2
  //How many file uploads to process in parallel.
  //(See the Enqueuing file uploads documentation section for more info)
  
  $obj->setUploadMultiple(true);
  //false
  //Whether to send multiple files in one request.
  //If this it set to true, then the fallback file input element will have the multiple attribute as well.
  //This option will also trigger additional events (like processingmultiple).
  //See the events documentation section for more information.
  
  $obj->setChunking(true);
  //false|Whether you want files to be uploaded in chunks to your server.
  //This can't be used in combination with uploadMultiple.
  //See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
  
  $obj->setForceChunking(true);
  //false
  //If chunking is enabled, this defines whether **every** file should be chunked,
  //even if the file size is below chunkSize.
  //This means, that the additional chunk form data will be submitted
  //and the chunksUploaded callback will be invoked.

  $obj->setChunkSize(2000000);
  //2000000|If chunking is true, then this defines the chunk size in bytes.
  
  $obj->setParallelChunkUploads(true);
  //false|If true, the individual chunks of a file are being uploaded simultaneously.
  
  $obj->setRetryChunks(true);
  //false|Whether a chunk should be retried if it fails.
  
  $obj->setRetryChunksLimit(6);
  //3|If retryChunks is true, how many times should it be retried.

  $obj->setMaxFilesize(256);
  //256|The maximum filesize (in megabytes) that is allowed to be uploaded.

  $obj->setParamName('file');
  //"file"
  //The name of the file param that gets transferred.
  //**NOTE**: If you have the option uploadMultiple set to true,
  //then Dropzone will append \[\] to the name.

  $obj->setCreateImageThumbnails(true);
  //true|Whether thumbnails for images should be generated

  $obj->setMaxThumbnailFilesize(1);
  //10|In MB. When the filename exceeds this limit, the thumbnail will not be generated.

  $obj->setThumbnailWidth(100);
  //120|If null, the ratio of the image will be used to calculate it.

  $obj->setThumbnailHeight(100);
  //120|The same as thumbnailWidth.
  //If both are null, images will not be resized.

  $obj->setThumbnailMethod('contain');
  //"crop"
  //How the images should be scaled down in case both,
  //thumbnailWidth and thumbnailHeight are provided.
  //Can be either contain or crop.

  $obj->setResizeWidth(100);
  //null
  //If set, images will be resized to these dimensions before being **uploaded**.
  //If only one, resizeWidth **or** resizeHeight is provided,
  //the original aspect ratio of the file will be preserved.
  //The options.transformFile function uses these options,
  //so if the transformFile function is overridden, these options don't do anything.

  $obj->setResizeHeight(100);
  //null
  //See resizeWidth.

  $obj->setResizeMimeType('image/jpeg');
  //null
  //The mime type of the resized image (before it gets uploaded to the server).
  //If null the original mime type will be used.
  //To force jpeg, for example, use image/jpeg.
  //See resizeWidth for more information.

  $obj->setResizeQuality(0.5);
  //0.8
  //The quality of the resized images. See resizeWidth.

  $obj->setResizeMethod('crop');
  //"contain"
  //How the images should be scaled down in case both,
  //resizeWidth and resizeHeight are provided.
  //Can be either contain or crop.

  $obj->setFilesizeBase(1024);
  //1000
  //The base that is used to calculate the **displayed** filesize.
  //You can change this to 1024 if you would rather display kibibytes, mebibytes, etc... 
  //1024 is technically incorrect, because 1024 bytes are 1 kibibyte not 1 kilobyte.
  //You can change this to 1024 if you don't care about validity.

  $obj->setMaxFiles();
  //null
  //If not null defines how many files this Dropzone handles.
  //If it exceeds, the event maxfilesexceeded will be called.
  //The dropzone element gets the class dz-max-files-reached accordingly so you can provide visual feedback.

  $obj->setHeaders();
  //null
  //An optional object to send additional headers to the server.
  //Eg: { "My-Awesome-Header": "header value" }

  $obj->setClickable('.clickables');
  //true
  //If true, the dropzone element itself will be clickable, if false nothing will be clickable.
  //You can also pass a CSS selector (for multiple elements) or an array of those.
  //In that case, all of those elements will trigger an upload when clicked.

  $obj->setIgnoreHiddenFiles(true);
  //true
  //Whether hidden files in directories should be ignored.

  $obj->setAcceptedFiles('image/*,application/pdf,.psd');
  //null
  //The default implementation of accept checks the file's mime type or extension against this list.
  //This is a comma separated list of mime types or file extensions.
  //Eg.: image/*,application/pdf,.psd
  //If the Dropzone is clickable this option will also be used as
  //[accept](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
  //parameter on the hidden file input as well.

  //$obj->setAcceptedMimeTypes();
  //null|**Deprecated!** Use acceptedFiles instead.

  $obj->setAutoProcessQueue(true);
  //true
  //If false, files will be added to the queue but the queue will not be processed automatically.
  //This can be useful if you need some additional user input before sending files
  //(or if you want want all files sent at once).
  //If you're ready to send the file simply call myDropzone.processQueue().
  //See the [enqueuing file uploads](#enqueuing-file-uploads) documentation section for more information.

  $obj->setAutoQueue(true);
  //true
  //If false, files added to the dropzone will not be queued by default.
  //You'll have to call enqueueFile(file) manually.

  $obj->setAddRemoveLinks(true);
  //false
  //If true, this will add a link to every file preview to remove or cancel (if already uploading) the file.
  //The dictCancelUpload, dictCancelUploadConfirmation and dictRemoveFile options are used for the wording.

  $obj->setPreviewsContainer('#previews');
  //null
  //Defines where to display the file previews – if null the Dropzone element itself is used.
  //The element should have the dropzone-previews class so the previews are displayed properly.

  $obj->setDisablePreviews(true);
  //false|Set this to true if you don't want previews to be shown.

  $obj->setHiddenInputContainer('body');
  //"body" 
  //This is the element the hidden input field will be appended to.
  //This might be important in case you use frameworks to switch the content of your page.
  //Can be a selector string.

  $obj->setCapture('microphone');
  //null If null, no capture type will be specified.
  //If camera, mobile devices will skip the file selection and choose camera.
  //If microphone, mobile devices will skip the file selection and choose the microphone.
  //If camcorder, mobile devices will skip the file selection and choose the camera in video mode.
  //On apple devices multiple must be set to false.
  //AcceptedFiles may need to be set to an appropriate mime type
  //(e.g. "image/*", "audio/*", or "video/*").

  //$obj->setRenameFilename();
  //null|**Deprecated**. Use renameFile instead.

  //$obj->setRenameFile();
  //null|A function that is invoked before the file is uploaded to the server and renames the file.
  //This function gets the File as argument and can use the file.name.
  //The actual name of the file that gets used during the upload can be accessed through file.upload.filename.

  $obj->setForceFallback(true);
  //false|If true the fallback will be forced.
  //This is very useful to test your server implementations first
  //and make sure that everything works as expected without dropzone.
  //If you experience problems, and to test how your fallbacks will look.



  $obj->value();


```

#### PHP Uploader methods:

```php
  use \Waxedphp\Dropzone\Uploader as DropzoneUploader;
  
  $u = new DropzoneUploader();
  
  $u->setWritablePath($someYourWritableFolder);
  // sets folder, which is writable.
  // It is wise to have this folder out of public access.
  
  $u->dispatch();
  // this will save uploaded files, maintaining all the chunk functionality.
  // Please note, that file goes to separate folder with long random name,
  // and its extension is changed. There is also log file along.
  // Check it, rename file and make it available within your own methods.
  
```
