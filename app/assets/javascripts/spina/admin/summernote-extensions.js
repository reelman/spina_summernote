(function(factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function($) {

    $.extend($.summernote.plugins, {


        'spina-images': function(context) {
            var self = this;

            var ui = $.summernote.ui;
            var options = $.summernote.options;

            context.memo('button.spina-imageSize100', function () {
              return ui.button({
                contents: '<span class="note-fontsize-10">100%</span>',
                click: function() {
                  context.invoke('beforeCommand');

                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.addClass('width-100');
                  $target.removeClass('width-50');
                  $target.removeClass('width-25');
                  $target.removeClass('width-15');

                  context.invoke('afterCommand');
                }
              }).render();
            });
            context.memo('button.spina-imageSize50', function () {
              return  ui.button({
                contents: '<span class="note-fontsize-10">50%</span>',
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.removeClass('width-100');
                  $target.addClass('width-50');
                  $target.removeClass('width-25');
                  $target.removeClass('width-15');

                  context.invoke('afterCommand');
                }
              }).render();
            });
            context.memo('button.spina-imageSize25', function () {
              return ui.button({
                contents: '<span class="note-fontsize-10">25%</span>',
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.removeClass('width-100');
                  $target.removeClass('width-50');
                  $target.addClass('width-25');
                  $target.removeClass('width-15');
                  context.invoke('afterCommand');
                }
              }).render();
            });
            context.memo('button.spina-imageSize15', function () {
              return ui.button({
                contents: '<span class="note-fontsize-10">15%</span>',
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.removeClass('width-100');
                  $target.removeClass('width-50');
                  $target.removeClass('width-25');
                  $target.addClass('width-15');
                  context.invoke('afterCommand');
                }
              }).render();
            });
            context.memo('button.spina-floatLeft', function () {
              return ui.button({
                contents: ui.icon(options.icons.alignLeft),
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.addClass('align-left');
                  $target.removeClass('align-right');
                  $target.removeClass('align-center');
                  context.invoke('afterCommand');
                }
              }).render();
            });

            context.memo('button.spina-floatRight', function () {
              return ui.button({
                contents: ui.icon(options.icons.alignRight),
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.removeClass('align-left');
                  $target.addClass('align-right');
                  $target.removeClass('align-center');
                  context.invoke('afterCommand');
                }
              }).render();
            });

            context.memo('button.spina-floatNone', function () {
              return ui.button({
                contents: ui.icon(options.icons.alignJustify),
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.removeClass('align-left');
                  $target.removeClass('align-right');
                  $target.removeClass('align-center');
                  context.invoke('afterCommand');
                }
              }).render();
            });

            // Remove Buttons
            context.memo('button.spina-removeMedia', function () {
              return ui.button({
                contents: ui.icon(options.icons.trash),
                click: function(event) {
                  context.invoke('beforeCommand');
                  var $target = $(context.invoke('restoreTarget').closest('figure'));
                  $target.remove();
                  context.invoke('afterCommand');
                }
              }).render();
            });

            context.memo('button.spina-lightbox', function () {
              return ui.button({
                contents: ui.icon(options.icons.arrowsAlt),
                click: function() {
                  context.invoke('beforeCommand');

                  var img = $(context.invoke('restoreTarget'));
                  var src = img.attr('src');
                  // TODO: manipulate src vars here
                  // &h=656&w=657

                  var $target = $(img.closest('figure'));
                  $target.attr('src', src);

                  if ($target.data('lightbox')) {
                    $target.data('lightbox', null);
                    $target.removeAttr('data-lightbox');
                  } else {
                    $target.data('lightbox', true);
                    $target.attr('data-lightbox', true);
                  }

                  context.invoke('afterCommand');
                }
              }).render();
            });

            this.initialize = function() {
            };

            this.destroy = function() {
            };
        },


        'spina-photo': function(context) {
            var self = this;

            var ui = $.summernote.ui;

            context.memo('button.spina-photo', function() {
                var button = ui.button({
                    contents: '<i class="note-icon-picture"/>',
                    tooltip: 'Insert Photo',
                    click: function() {
                        context.invoke('saveRange');
                        editor_id = $(this).parents('.horizontal-form-content').children('textarea')[0].id;
                        $.get("/admin/photos/wysihtml5_select/" + editor_id);
                    }
                });

                // create jQuery object from button instance.
                var $hello = button.render();
                return $hello;
            });

            this.initialize = function() {
            };

            this.destroy = function() {
            };
        },

        'spina-link': function(context) {
            var self = this;

            var ui = $.summernote.ui;

            context.memo('button.spina-link', function() {
                var button = ui.button({
                    contents: '<i class="note-icon-link"/>',
                    tooltip: 'Insert Link',
                    click: function() {
                        context.invoke('saveRange');
                        var selectedtext = context.invoke('createRange');
                        var modal = $('<div id="insert-url-modal" class="modal modal-medium">' +
                            '<header>' +
                              '<a href="#", class="close_modal", data-dismiss="modal", data-icon: "m"></a>' +
                              '<h3>Insert URL</h3>' +
                            '</header>' +
                            '<section class="horizontal-form">' +
                              '<div class="horizontal-form-group">' +
                                '<input class="horizontal-form-content" value="' + selectedtext.toString().replace(/'/g, '\x27').replace(/"/g, '&quot;') + '" type="text" placeholder="Title"></input>' +
                              '</div>' +
                              '<div class="horizontal-form-group">' +
                                '<input class="horizontal-form-content" type="text" placeholder="http://www.example.com"></input>' +
                                '<a href="#" class="button" style="margin-left: 10px;">Insert</a>' +
                              '</div>' +
                            '</section>' +
                        '</div>');
                        modal.modal();
                        $('.button', '#insert-url-modal').click( function() {
                          var inputs = $('input', '#insert-url-modal');
                          var title = inputs[0].value;
                          var url = inputs[1].value;

                          if(title.length === 0) {
                            title = url;
                          }
                          if(url.length > 0) {
                            context.invoke('restoreRange');
                            context.invoke('createLink', {
                              text: title,
                              url: url,
                              newWindow: false
                            });
                          }
                          $.hideModal();
                        });

                        $(document).trigger('page:change');
                        return false;
                    }
                });

                // create jQuery object from button instance.
                var $hello = button.render();
                return $hello;
            });

            this.initialize = function() {
            };

            this.destroy = function() {
            };
        },

        'spina-cleaner': function(context) {
            var self = this;

            var ui = $.summernote.ui;
            var cleanText = function(clntxt){
                var stringStripper=/(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
                var output=clntxt.replace(stringStripper,' ');
                var commentStripper=new RegExp('<!--(.*?)-->','gi');
                output=output.replace(commentStripper,'');
                var tagStripper=new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
                output=output.replace(tagStripper,'');
                var badTags=['style','script','applet','embed','noframes','noscript'];
                for(var i=0;i<badTags.length;i++){
                    tagStripper=new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>','gi');
                    output=output.replace(tagStripper,'');
                }
                var badAttributes=['style','start'];
                for(var ii=0;ii<badAttributes.length;ii++){
                    var attributeStripper=new RegExp(' '+badAttributes[i]+'="(.*?)"','gi');
                    output=output.replace(attributeStripper,'');
                }
                return output;
            };

            context.memo('button.spina-cleaner', function() {
                var button = ui.button({
                    contents: '<span class="note-fontsize-10">W</span>',
                    tooltip: 'Clean paste',
                    click: function() {
                        context.invoke('saveRange');

                        var modal = $('<div id="cleaner-modal" class="modal modal-medium">' +
                            '<header>' +
                              '<a href="#", class="close_modal", data-dismiss="modal", data-icon: "m"></a>' +
                              '<h3>Paste Text</h3>' +
                            '</header>' +
                            '<section class="horizontal-form">' +
                              '<div class="horizontal-form-group">' +
                                '<textarea class="horizontal-form-content" row="10"></textarea>' +
                              '</div>' +
                              '<div class="horizontal-form-group">' +
                                '<a href="#" class="button" style="margin-left: 10px;">Insert</a>' +
                              '</div>' +
                            '</section>' +
                        '</div>');
                        modal.modal();
                        $('.button', '#cleaner-modal').click( function() {
                          var inputs = $('textarea', '#cleaner-modal');
                          var text = cleanText(inputs[0].value);

                          if(text.length > 0) {
                            context.invoke('restoreRange');
                            context.invoke('pasteHTML', text);
                          }
                          $.hideModal();
                        });

                        $(document).trigger('page:change');
                        return false;
                    }
                });

                // create jQuery object from button instance.
                var $hello = button.render();
                return $hello;
            });

            this.initialize = function() {
            };

            this.destroy = function() {
            };
        },

        'spina-video': function(context) {
            var self = this;

            var ui = $.summernote.ui;

            context.memo('button.spina-video', function() {
                var button = ui.button({
                    contents: '<i class="note-icon-video"/>',
                    tooltip: 'Insert Video',
                    click: function() {
                      context.invoke('saveRange');
                      var modal = $('<div id="insert-video-modal" class="modal modal-medium">' +
                          '<header>' +
                            '<a href="#", class="close_modal", data-dismiss="modal", data-icon: "m"></a>' +
                            '<h3>Insert Video</h3>' +
                          '</header>' +
                          '<section class="horizontal-form">' +
                            '<div class="horizontal-form-group">' +
                              '<input class="horizontal-form-content" type="text" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></input>' +
                              '<button class="button" style="margin-left: 10px;">Insert</button>' +
                            '</div>' +
                          '</section>' +
                      '</div>');
                      modal.modal();

                      $('.button', '#insert-video-modal').click( function() {
                        var url = $('input', '#insert-video-modal').val();
                        context.invoke('restoreRange');
                        context.invoke('insertNode', self.createVideoNode(url));
                        $.hideModal();
                      });
                      $(document).trigger('page:change');
                      return false;
                    }
                });

                // create jQuery object from button instance.
                var $hello = button.render();
                return $hello;
            });

            // this.initialize = function() {
            //     // append your modal basic html here
            //     // like:
            //     this.$mymodal = $('body').append(
            //         '<div class="modal fade">' +
            //             '... inner html ...'+
            //         '</div>'
            //       );
            // };
            //
            // this.destroy = function() {
            //     // remove your modal basic html here
            //     this.$mymodal.remove();
            // };

            this.initialize = function() {
            };

            this.destroy = function() {
              this.$mymodal.remove();
            };


            this.createVideoNode = function (url) {
              // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
              var ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
              var ytMatch = url.match(ytRegExp);

              var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9_-]*)/;
              var igMatch = url.match(igRegExp);

              var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
              var vMatch = url.match(vRegExp);

              var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
              var vimMatch = url.match(vimRegExp);

              var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
              var dmMatch = url.match(dmRegExp);

              var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
              var youkuMatch = url.match(youkuRegExp);

              var mp4RegExp = /^.+.(mp4|m4v)$/;
              var mp4Match = url.match(mp4RegExp);

              var oggRegExp = /^.+.(ogg|ogv)$/;
              var oggMatch = url.match(oggRegExp);

              var webmRegExp = /^.+.(webm)$/;
              var webmMatch = url.match(webmRegExp);

              var $responsivevideo;
               $responsivevideo= $('<div>');
               $responsivevideo.addClass('embed-container');

              var $video;
              if (ytMatch && ytMatch[1].length === 11) {
                var youtubeId = ytMatch[1];
                $video = $('<iframe allowfullscreen>')
                    .attr('frameborder', 0)
                    .attr('src', '//www.youtube.com/embed/' + youtubeId + '?rel=0');
              } else if (igMatch && igMatch[0].length) {
                $video = $('<iframe>')
                    .attr('frameborder', 0)
                    .attr('src', igMatch[0] + '/embed/')
                    .attr('width', '612').attr('height', '710')
                    .attr('scrolling', 'no')
                    .attr('allowtransparency', 'true');
              } else if (vMatch && vMatch[0].length) {
                $video = $('<iframe>')
                    .attr('frameborder', 0)
                    .attr('src', vMatch[0] + '/embed/simple')
                    .attr('width', '600').attr('height', '600')
                    .attr('class', 'vine-embed');
              } else if (vimMatch && vimMatch[3].length) {
                $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                    .attr('frameborder', 0)
                    .attr('src', '//player.vimeo.com/video/' + vimMatch[3])
                    .attr('width', '640').attr('height', '360');
              } else if (dmMatch && dmMatch[2].length) {
                $video = $('<iframe>')
                    .attr('frameborder', 0)
                    .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])
                    .attr('width', '640').attr('height', '360');
              } else if (youkuMatch && youkuMatch[1].length) {
                $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                    .attr('frameborder', 0)
                    .attr('height', '498')
                    .attr('width', '510')
                    .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
              } else if (mp4Match || oggMatch || webmMatch) {
                $video = $('<video controls>')
                    .attr('src', url)
                    .attr('width', '640').attr('height', '360');
              } else {
                // this is not a known video link. Now what, Cat? Now what?
                return false;
              }


              $video.addClass('note-video-clip responsive-embed');
              $responsivevideo.append($video);
              return $responsivevideo[0];
            };
        }
    });

}));
