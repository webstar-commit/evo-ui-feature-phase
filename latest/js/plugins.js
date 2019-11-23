(function ($) {

  $.fn.crfi = function () {
    this.change(function () {
      if ($(this).attr('type') == "radio") {
        $("input[name=" + $(this).attr('name') + "]").not(this).next(".crf").removeClass("checked");
      }
      if ($(this).prop('checked')) {
        $(this).next().addClass("checked");
      } else {
        $(this).next().removeClass("checked");
      }
    });
    this.each(function (i) {
      $(this).attr("id", "crf-input-" + i).css({
        position: "absolute",
        left: -9999 + "em"
      }).addClass("crf-i").next("label").addClass("crf").attr("for", "crf-input-" + i);
      if ($(this).prop('checked')) {
        $(this).next().addClass("checked");
      }
    });
  };

  var settings;

  function closeF() {
    if ($(".crf-sm.opened").length) {
      $(".crf-s.opened").removeClass("opened");
      $(".crf-sm.opened").removeClass("opened").hide();
      settings.close.call()
    }
  }

  var methods = {
    init: function (options) {
      settings = $.extend({
        select: function () {
        },
        done: function () {
        },
        open: function () {
        },
        close: function () {
        }
      }, options);

      $(document).unbind("click.crfs").on("click.crfs", ".crf-s", function () {
        var currentItem = $("div[data-id=" + $(this).attr("id") + "]");
        if (currentItem.is(":visible")) {
          closeF()
          return false;
        }
        closeF()
        var outh = $(this).outerHeight();
        var selectCl = $(this).find("select").attr("class");
        var offsetE = $(this).offset();
        var currHei = currentItem.show().height();
        currentItem.css({position: "absolute", left: -9999 + "em"});
        $(this).addClass("opened");
        currentItem.addClass("opened " + selectCl).css({
          left: offsetE.left,
          top: (offsetE.top + outh + currHei > $(document).height()) ? offsetE.top - currHei : offsetE.top + outh,
          width: $(this).outerWidth()
        }).show();
        settings.open.call()
      });
      $(document).click(function (e) {
        if ($(e.target).closest(".crf-sm.opened, .crf-s.opened").length > 0) {
          return false;
        }
        closeF();
      });


      $(window).resize(function () {
        var currentT = $(".crf-s.opened");
        if (currentT.length) {
          var currentItem = $(".crf-sm.opened");
          var outh = currentT.outerHeight();
          var offsetE = currentT.offset();
          var currHei = currentItem.height();
          currentItem.css({
            left: offsetE.left,
            top: (offsetE.top + outh + currHei > $(document).height()) ? offsetE.top - currHei : offsetE.top + outh,
            width: currentT.outerWidth()
          });
        }
      });

      $(document).on("click.crfs", ".crf-sm li", function () {
        var currentMenu = $(this).parentsUntil(".crf-sm").parent().attr("data-id");
        var currentClass = $("#" + currentMenu).attr("class");
        $("#" + currentMenu).attr("class", "crf-s").addClass($(this).attr("class").replace("selected", "")).addClass(currentClass.replace("hided-s", "").replace("opened", "")).find(".option").html($(this).html());
        $("#" + currentMenu).find("select").children().prop('selected', false).eq($(this).index()).prop('selected', true).change();
        $(this).parentsUntil(".crf-sm").parent().find(".selected").removeClass("selected");
        $(this).addClass("selected");
        closeF()
        settings.select.call()
        return false;
      });


      this.each(function (i) {
        if (!$(this).hasClass("hided-s")) {
          $(this).addClass("hided-s").hide().wrap("<span class='crf-s " + $(this).attr("class") + "' id='crf-s-" + i + "' />").parent().append("<span class='option'>" + $(this).find("option:selected").html() + "</span>");
          var menuList = $("<ul></ul>");

          $(this).children().each(function () {
            menuList.append("<li class='" + (($(this).attr('class') != undefined) ? $(this).attr('class') + "" : "") + (($(this).is(':selected')) ? " selected" : "") + "'><span class='link'>" + $(this).html() + "</span></li>");
          });
          $("<div class='crf-sm' data-id='crf-s-" + i + "'/>").append(menuList).appendTo("body")
          settings.done.call()
        }
        ;
      });

    },
    hide: function () {
      closeF();
    }
  };

  $.fn.crfs = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      return methods.init.apply(this, arguments);
    }
  };
}(jQuery));
