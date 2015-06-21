/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        var len = allFeeds.length;

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.len).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has a non-empty URL', function() {
            for(var i = 0; i < len; i++){
                expect(allFeeds[i].url).not.toBe('');
                // should be the same as toBeDefined();
                expect(allFeeds[i].url).not.toBe(undefined);
            }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a non-empty name', function() {
            for(var i = 0; i < len; i++){
                expect(allFeeds[i].name).not.toBe('');
                expect(allFeeds[i].name).not.toBe(undefined);
            }
         });
    });


    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            // creates an array that holds all of body's classes
            var classes = document.body.className.split(/\s+/);
            // tests if body as a class 'menu-hidden'
            expect(classes).toContain('menu-hidden');
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          var menuIcon = $('.menu-icon-link');
          it('should change visibility when the menu icon is clicked', function(){
            // trigger an Icon click
            menuIcon.trigger('click');
            // now the menu should be visible
            var classes = document.body.className.split(/\s+/);
            expect(classes).not.toContain('menu-hidden');
            // trigger another click
            menuIcon.trigger('click');
            // now it should be hidden
            classes = document.body.className.split(/\s+/);
            expect(classes).toContain('menu-hidden');
          });

    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        // call the loadFeed function and make sure to wait till it is finsihed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        // now test if .feed has child elements, i.e. entries
        it('should have at least one .entry element within the .feed container', function(done){
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         // To test if the content changes with new further calls to
         // loadFeed(), the .header-title and .feed textContents of
         // two consecutive calls with
         // different parameters are compared
        var header1, header2, content1, content2;
        beforeEach(function(done) {
            // first call to loadFeed()
            loadFeed(1, function() {
                header1 = $('.header-title')[0].textContent;
                content1 = $('.feed')[0].textContent;
                //second call to loadFeed()
                loadFeed(2, function(){
                    header2 = $('.header-title')[0].textContent;
                    content2 = $('.feed')[0].textContent;
                    done();
                });
            });
        });

        // after both calls are finished the header-titles are comapred
        it('should result in the content to change', function(done){
            expect(header1).not.toEqual(header2);
            expect(content1).not.toEqual(content2);
            done();
        });
    });
}());
