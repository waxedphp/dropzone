
;(function ( $, window, document, undefined ) {

    var pluginName = 'dropzone',
        _search = '.waxed-dropzone',
        _api = [],
        defaults = {
            propertyName: "value"
        },
        inited = false
        ;

    function Instance(pluggable,element,dd){
      var that = this;
      this.pluggable = pluggable;
      this.element = element;
      this.o = element;
      this.t = 'dropzone';
      this.dd = dd;
      this.name = '';
      this.dropzone = null;
      this.existingFiles = [];
      this.hideFileOnTime = false;
      this.cfg = {
        url:null,
        acceptedFiles:'image/*'
      };

      this.invalidate = function(RECORD){

      },

      this.setRecord = function(RECORD){
        if (typeof that.dd.name == 'undefined') return;
        var rec = that.pluggable.getvar(that.dd.name, RECORD);
        if (typeof rec != 'object') { return; };
        var changed = false;
        if (typeof rec.acceptedFiles == 'string') {
          this.cfg.acceptedFiles = rec.acceptedFiles;
          changed = true;
        };
        if (typeof rec.headers == 'object') {
          this.cfg.headers = rec.headers;
          changed = true;
        };
        if (typeof rec.ignoreHiddenFiles == 'boolean') {
          this.cfg.ignoreHiddenFiles = rec.ignoreHiddenFiles;
          changed = true;
        };
        if (typeof rec.maxFilesize == 'number') {
          this.cfg.maxFilesize = rec.maxFilesize;
          changed = true;
        };
        if (typeof rec.hideFileOnTime == 'number') {
          this.hideFileOnTime = rec.hideFileOnTime;
          changed = true;
        } else if (typeof rec.existingFiles == 'object') {
          //you cant have both...
          this.existingFiles = rec.existingFiles;
          changed = true;
        };

        if (typeof rec.maxFiles == 'number') {
          this.cfg.maxFiles = rec.maxFiles;
          changed = true;
        }

        if (typeof rec.disablePreviews == 'boolean') {
          this.cfg.disablePreviews = rec.disablePreviews;
          changed = true;
        }

        if (typeof rec.uploadMultiple == 'boolean') {
          this.cfg.uploadMultiple = rec.uploadMultiple;
          changed = true;
        }

        if ((typeof rec.capture == 'string')&&(
          ['camera', 'microphone', 'camcorder'].indexOf(rec.capture)>=0
          //dont forget to set appropriate acceptedFiles
        )) {
          this.cfg.capture = rec.capture;
          this.cfg.uploadMultiple = false;
          changed = true;
        }

        if (typeof rec.paramName == 'string') {
          this.cfg.paramName = rec.paramName;
          changed = true;
        }

        if (typeof rec.chunking == 'boolean') {
          this.cfg.chunking = rec.chunking;
          changed = true;
        }

        if (typeof rec.chunkSize == 'number') {
          this.cfg.chunkSize = rec.chunkSize;
          changed = true;
        }

        if (typeof rec.parallelChunkUploads == 'boolean') {
          this.cfg.parallelChunkUploads = rec.parallelChunkUploads;
          changed = true;
        }

        if (typeof rec.retryChunks == 'boolean') {
          this.cfg.retryChunks = rec.retryChunks;
          changed = true;
        }

        if (typeof rec.retryChunksLimit == 'number') {
          this.cfg.retryChunksLimit = rec.retryChunksLimit;
          changed = true;
        }

        //autoProcessQueue
        if (typeof rec.autoProcessQueue == 'boolean') {
          this.cfg.autoProcessQueue = rec.autoProcessQueue;
          changed = true;
        }

        //addRemoveLinks
        if (typeof rec.addRemoveLinks == 'boolean') {
          this.cfg.addRemoveLinks = rec.addRemoveLinks;
          changed = true;
        }

        //forceFallback
        if (typeof rec.forceFallback == 'boolean') {
          this.cfg.forceFallback = rec.forceFallback;
          changed = true;
        }

        if (typeof rec.url == 'string') {
          this.cfg.url = rec.url;
          changed = true;
        }

        if (changed) this._build();
      },

      this.free = function() {
        if (that.dropzone!=null) that.dropzone.destroy();
      },
      this._display_existing_file = function(a) {
        if(!((_.has(a,'name'))&&(_.has(a,'thumbnail')))) return;
        const mockFile = {
          name: a.name,
          accepted:true //this is required to set maxFiles count automatically
        };
        if (_.has(a,'size')) mockFile['size'] = a.size;
        if (_.has(a,'id')) mockFile['id'] = a.id;
        that.dropzone.files.push(mockFile);
        that.dropzone.displayExistingFile(mockFile, a.thumbnail);
      },
      this._build = function() {
        if (that.dropzone!=null) that.dropzone.destroy();
        console.log('DROPZONE',this.cfg);
        that.dropzone = new Dropzone(that.element, this.cfg);
        if (this.hideFileOnTime) {
          that.dropzone.on("complete", function(file) {
            setTimeout(function() {
              that.dropzone.removeFile(file);
            }, this.hideFileOnTime);
          });
        } else {
          for (var i=0; i<this.existingFiles.length; i++) {
            this._display_existing_file(this.existingFiles[i]);
          }
        }
        that.dropzone.on("completemultiple", function() {
          //console.log('completemultiple');
        });
        that.dropzone.off("queuecomplete").on("queuecomplete", function() {
          console.log('queuecomplete');
          that.pluggable.sendData({
            'action': 'queuecomplete'
          }, that.cfg.url, that);
        });        
          
      },

      this.init=function() {
        this.cfg.url = this.dd.route;
        this._build();
        //that.dropzone = new Dropzone(that.element, { url: this.dd.route });
        $(that.element).addClass('dropzone');
        //console.log($(that.element).data());
        inited = true;
      },
      this._init_();
    }

    $.waxxx(pluginName, _search, Instance, _api);


})( jQuery, window, document );
/*--*/
//# sourceURL: /js/jam/boilerplate/plugin.js
