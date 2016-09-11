/*
 * jQuery Pagination Plugin
 * Copyright (c) 2016 Hugh Shen
 * https://github.com/hughshen/jquery-pagination
 */
;(function($, undefined) {

	$.fn.pagination = function(options) {

		var settings = $.extend(true, {}, $.fn.pagination.defaults, options || {}),
			elements = this;

		elements.each(function(key, val) {
			var $this = $(val);
			var pagination = {
				wrap: $this.find(settings.paginationSelector),
				items: $this.find(settings.itemSelector),
				total: $this.find(settings.itemSelector).length,
				pages: Math.ceil($this.find(settings.itemSelector).length / settings.showItems),
				current: 1,

				init: function() {
					this.items.hide();
					for (var i = 0; i < settings.showItems; i++) {
						this.items.eq(i).show();
					}
				},

				generatorPages: function() {
					this.wrap.html('');
					var $pagination = this,
						pagesWrap = $(settings.pagesWrap);

					// Prev
					if (settings.showPrev && this.current > 1) pagesWrap.append(this.getPageItemNode(settings.prevClass, this.current - 1, settings.prevText));
					// Render pages
					for (var i = 0; i < this.pages; i++) {
						var active = '',
							page = i + 1;
						if (page == this.current) active = settings.pageActiveClass;
						// Pages range
						if (page == 1) {
							pagesWrap.append(this.getPageItemNode(active, page, page));
							if (this.current - 1 > settings.showRange + 1) pagesWrap.append(this.getPageItemNode(settings.sepClass, 0, settings.sepText));
						} else if (page == this.pages) {
							if (this.pages - this.current > settings.showRange + 1) pagesWrap.append(this.getPageItemNode(settings.sepClass, 0, settings.sepText));
							pagesWrap.append(this.getPageItemNode(active, page, page));
						} else {
							if (Math.abs(this.current - page) <= settings.showRange) pagesWrap.append(this.getPageItemNode(active, page, page));
						}
					}
					// Next
					if (settings.showNext && this.current < this.pages) pagesWrap.append(this.getPageItemNode(settings.nextClass, this.current + 1, settings.nextText));
					// Bind click event
					var pageItems = pagesWrap.find(settings.pagesItem.replace(/[<>]/g, '')); 
					pageItems.bind('click', function() {
						$pagination.setPage($(this).find('a').attr('data-page'));
					});

					pagesWrap.addClass(settings.pagesWrapClass);
					this.wrap.append(pagesWrap);
				},

				getPageItemNode: function(className, page, text) {
					return $(settings.pagesItem).addClass(settings.pagesItemClass).addClass(className).append($('<a>').attr('href', 'javascript:;').attr('data-page', page).html(text));
				},

				updateItems: function() {
					var start = settings.showItems * (this.current - 1),
						end = start + settings.showItems;

					this.items.hide();
					this.items.slice(start, end).show();
				},

				setPage: function(page) {
					if (parseInt(page) == 0 || parseInt(page) > this.pages) return;
					this.current = parseInt(page);
					this.generatorPages();
					this.updateItems();
				},
			};

			pagination.init();
			pagination.generatorPages();

		});
	}

	$.fn.pagination.defaults = {
		'itemSelector': '.item',
		'paginationSelector': '.pagination',
		'showItems': 5,
		'showRange': 1,
		'showPrev': true,
		'showNext': true,
		'prevClass': 'prev',
		'nextClass': 'next',
		'prevText': '&lt;',
		'nextText': '&gt;',
		'sepClass': 'sep',
		'sepText': '...',
		'pagesWrap': '<ul>',
		'pagesItem': '<li>',
		'pagesWrapClass': '',
		'pagesItemClass': '',
		'pageActiveClass': 'active',
	};
	
})(jQuery);
