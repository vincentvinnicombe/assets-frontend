/**
 * Submit a form via AJAX
 *
 * Hijack's a forms submit event and POSTs its data via AJAX to avoid page reloads.
 *
 * Usage:
 *
 *  Place the attribute 'data-ajax-submit="true"' on either a form tag or a button
 *  that has:
 *    - a formaction attribute for non-javascript enabled form post (full page reload)
 *    - a 'data-target-container' attribute with a selector for the element to target with new content
 *    - a 'data-target-type' attribute to indicate the method to use when adding new content to the container - options are 'insert' or 'replace' (insert is the default)
 *
 *
 *  <form action="#" data-ajax-submit="true">
 *      <input type="submit" value="Submit"/>
 *  </form>
 *
 *  or
 *
 *  <button formaction="#" data-ajax-submit="true" data-target-type="" >Submit</button>
 *
 **/

require('jquery');

var ajaxFormSubmit = {

  init: function() {
    var path,
        _this = this,
        $ajaxForm = $('[data-ajax-submit]'),
        formCount = $ajaxForm.length,
        f = 0,
        $ajaxItem = null;

    if (!formCount) {
      return false;
    }

    for (; f < formCount; f++) {
      $ajaxItem = $($ajaxForm[f]);

      $ajaxItem.parents('form').on('submit', { $form: $ajaxItem }, function(event) {
        event.preventDefault();

        var $form = event.data.$form;

        if ($form[0].nodeName.toLowerCase() === 'button') {
          path = $form.attr('formaction');
        }
        else {
          path = $form.attr('action');
        }

        _this.doSubmit(path, $(this).serialize() + '&isajax=true', $form.attr('data-target-container'), $form.attr('data-target-type'));
      });
    }
  },

  doSubmit: function(path, data, targetContainer, targetType) {
    $.ajax({
      url: path,
      type: 'POST',
      data: data
    })
    .done(function(result) {
      if (targetType === 'replace') {
        $(targetContainer).replaceWith(result);
      } else {
        // 'insert'
        $(targetContainer).html(result);
      }
    })
    .fail(function(result) {
      console.log('error', result);
    })
    .always(function(result) {
      console.log('complete', result);
    });
  }

};

module.exports = ajaxFormSubmit;
