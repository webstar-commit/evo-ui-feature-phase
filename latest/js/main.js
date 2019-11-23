$(document).ready(function () {
  function is_touch_device() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  $("input[type=checkbox], input[type=radio]").crfi();
  $("select").crfs();
  $(".menu-trigger").click(function () {
    $(this).toggleClass("active").next().toggleClass("active")
  });
  $(document).on('click', ".table.services tr:not(.details)", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").next().find(".service-card").slideUp(300);
    } else {
      $(this).addClass("active").next().find(".service-card").slideDown(300);
    }
    return false;
  });
  $(document).on('click', ".gate-apl > h3", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active").next().slideUp(300);
    } else {
      $(this).addClass("active").next().slideDown(300);
    }
    return false;
  });
  if (is_touch_device()) {
    $(document).on('click', ".overall-over article", function () {
      if ($(this).hasClass("active0")) {
        $(this).removeClass("active0").find(".modal").removeClass("active");
      } else {
        $(" .overall-over article").removeClass("active0");
        $(" .overall-over article .modal").removeClass("active");
        $(this).addClass("active0").find(".modal").addClass("active");
      }
      ;
      return false;
    });
    var event = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) ? "touchstart" : "click";

    $(document).on(event, function (e) {
      if ($(e.target).closest('.overall-over article').length === 0) {
        $(" .overall-over article").removeClass("active0");
        $(" .overall-over article .modal").removeClass("active");
      }
    });
  }
  $(".btn-add-app, .add-aplication .add").click(function () {
    $(".view-type a").eq(1).trigger("click");
    $(".tabs ul li").eq(0).find("a").trigger("click");
    $(".row-list").removeClass("editable");
    $("#appls .add-clone").addClass("focus");
    return false;
  });
  $(".options .close").click(function () {
    $(".row-list").removeClass("editable");
    return false;
  });
  $(".options .btn").click(function () {
    $(".modal-box").addClass("active");
    $("html").addClass("modal-box-active");
    $("#appls .row-list.editable td input:checked").each(function () {
      $(".modal-box .bottom").before($(".modal-box .application.hide").clone().removeClass("hide"));
      $(".modal-box .application:last h3").text($(this).parent().next().text());
    });
    $("input[type=checkbox], input[type=radio]").crfi();
    return false;
  });
  $("#appls .row-list th input").change(function () {
    if ($(this).is(":checked")) {
      $("#appls .row-list.editable td input").prop('checked', true).next().addClass("checked");
    } else {
      $("#appls .row-list.editable td input").prop('checked', false).next().removeClass("checked");
    }
    $(".options .right .count").text($("#appls .row-list.editable td input:checked").size());
  });
  $("#appls .row-list td input").change(function () {
    $(".options .right .count").text($("#appls .row-list.editable td input:checked").size());
    $("#appls .row-list.editable th input").prop('checked', false).next().removeClass("checked");
  });
  $(".btn-add-serv").click(function () {
    $(".view-type a").eq(1).trigger("click");
    $(".tabs ul li").eq(0).find("a").trigger("click");
    $("#appls .add-clone").removeClass("focus");
    $(".row-list").addClass("editable");
    return false;
  });
  $(".popup .close,.options .close").click(function () {
    $("select").crfs("hide");
    $("#appls .add-clone").removeClass("focus");
    return false;
  });
  $(".modal-box .popup > .close, .modal-box .btn-grey").click(function () {
    $("select").crfs("hide");
    $("html").removeClass("modal-box-active");
    $(".modal-box").removeClass("active");
    $("#appls .add-clone").removeClass("focus");
    $(".row-list").removeClass("editable");
    return false;
  });
  $(".modal-box form").submit(function () {
    $("select").crfs("hide");
    $("html").removeClass("modal-box-active");
    $(".modal-box").removeClass("active");
    $("#appls .add-clone").removeClass("focus");
    $(".row-list").removeClass("editable");
    $(".cols-list .to-clone").clone().removeClass("hide").appendTo($("#services .cols-list"));

    $("#services .row-list .scroll-bar > table > tbody").append('<tr><td class="name down"><span class="arrow"></span>NEW one</td><td class="uptime">12 hours 2 Min</td><td class="owner">Jason Richards</td><td class="deployment">Undeployed</td><td class="instances">12</td><td class="time">12 SEC</td><td class="errors"><img width="11" src="img/ico_flag.png" alt="">0</td>	</tr><tr class="details"><td colspan="7">	<div class="service-card">			<div class="graph">			<img src="img/3.png" alt="">		</div>		<div class="stats">			<ul>				<li class="orange">					<strong>2</strong>					<img src="img/ico_se_1.png" alt="">					<span class="text">Database</span>				</li>				<li class="purple">					<strong>10</strong>					<img src="img/ico_se_2.png" alt="">					<span class="text">Web Engine</span>				</li>				<li class="blue">					<strong>12</strong>					<img src="img/ico_se_3.png" alt="">					<span class="text">Applications</span>				</li>			</ul>			<table>				<thead>					<tr>						<th class="th-name">NAME</th>						<th class="th-uptime">UPTIME</th>						<th class="th-instances">INSTANCES</th>						<th class="th-time">RESPONSE TIME</th>						<th class="th-type">TYPE</th>					</tr>				</thead>				<tbody>				</tbody>			</table>		</div>	</div></td></tr>');

    $(".modal-box .application:not(.hide)").each(function () {
      $(".cols-list .to-clone:last").find(".add-aplication").append('<article><div class="head"><img src="img/1.png" alt=""><h4><a href="#">' + $(this).find("h3").text() + '</a></h4><div class="tags">			<a href="#" class="stat">		<img src="img/ico_flag.png" width="10" alt="">		<span>0 ERRORS</span>	</a>	<a href="#" class="stat ins">		<img src="img/ico_green.png" width="13" alt="">		<span>' + $(this).find("fieldset input").val() + ' INSTANCES</span>	</a></div></div><ul><li><strong>DEPLOYMENT</strong><span>Undeployed</span></li><li><strong>RESPONSE TIME</strong><span>12 SEC</span></li><li><strong>SERVICE</strong><span>None</span></li><li><strong>UPTIME</strong><span>12 hours 2 Min</span></li></ul></article>')
      $("#services .row-list .scroll-bar > table > tbody .details:last").find(".service-card tbody").append('<tr><td class="th-name"><img src="img/ico_se_1.png" alt=""><a href="#">' + $(this).find("h3").text() + '</a></td><td class="th-uptime">12 hours 2 Min</td><td class="th-instances">' + $(this).find("fieldset input").val() + '</td><td class="th-time">12 SEC</td><td class="th-type">Database</td></tr>')
    });
    return false;
  });
  $(document).on('click', ".modal-box .delete", function () {
    $(this).parent().remove();
    return false;
  });
  $(document).on('click', ".modal-box .delete", function () {
    $(this).parent().remove();
    return false;
  });
  $(document).on('click', ".load-more .btn", function () {
    $(".loading-more").toggleClass("active");
    return false;
  });
  $("#appls form").submit(function () {
    $("select").crfs("hide");
    $("#appls .add-clone").removeClass("focus");
    $(".add-clone").after('<tr><td class="name"><span class="checkbox"><input type="checkbox"></input><label></label></span><a href="#">Application…123</a></td><td class="uptime">12 hours 2 Min</td><td class="owner">Jason Richards</td><td class="deployment">Undeployed</td><td class="instances">12</td><td class="time">12 SEC</td><td class="errors"><img width="11" src="img/ico_flag.png" alt="">0</td></tr>')
    $(this)[0].reset();
    $("input[type=checkbox], input[type=radio]").crfi();
    return false;
  });
  $(".view-type a").click(function () {
    $(".view-type .current").removeClass("current");
    $(".list-type-r.active").removeClass("active");
    $(this).addClass("current");
    $($(this).attr("href")).addClass("active");
    return false;
  });
  $(".btn-add-app").click(function () {
    return false;
  });
  $(".tabs ul li a").click(function () {
    $(".tab-content").removeClass("active");
    $(".tabs .current").removeClass("current");
    $(this).parent().addClass("current");
    $($(this).attr("href")).addClass("active");
    return false;
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $("#header").addClass("moved")
    } else {
      $("#header").removeClass("moved")
    }

  });
});
