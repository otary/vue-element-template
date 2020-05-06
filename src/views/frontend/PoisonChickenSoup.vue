<template>
  <div class="container">

    <div class="">
      <div class="header">
        <h1>毒鸡汤</h1>
      </div>

      <div class="book-box">
        <div id="quotationBook">
          <div class="b-load">
            <!-- <div class="quotation-book__page">
               <p>满脑子都是oo的哦没办法谈恋爱</p>
             </div>
             <div class="quotation-book__page">
               <p>Today we will create an animated portfolio gallery with jQuery.
                 The gallery will contain a scroller for thumbnails and a
                 content area where we will display details about the portfolio
                 item. The image can be enlarged by clicking on it, making
                 it appear as an overlay.</p>
             </div>
             <div class="quotation-book__page">
               <p>满脑子都是oo的哦没办法谈恋爱</p>
             </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PoisonChickenSoup',
    data() {
      return {
        $quotationBook: null,
        quotations: []
      }
    },
    watch: {
      quotations: function(newValue, oldValue) {
        let _quotations = newValue || []
        _quotations.forEach((item) => {
          this.$quotationBook.booklet('add', 'end', '<div class="quotation-book__page"><p>' + item.content + '</p></div>')
        })
      }
    },

    methods: {
      fetchRandomQuotations: function() {
        //$.getJSON("");

        // @TODO 获取数值
        this.quotations = [{
          qid: 14,
          content: '死并不可怕，怕的是再也不能活了。'
        }, {
          qid: 15,
          content: '世界这么大，我想去看看，什么地方要饭比较方便！'
        }, {
          qid: 17,
          content: '世界上本没有鸡汤，鸡死了，便做成了鸡汤。'
        }, {
          qid: 18,
          content: '如果所有人都理解你，那你得普通成什么样！'
        }, {
          qid: 19,
          content: '其实只要不要脸，很多人生难题都能迎刃而解。'
        }, {
          qid: 20,
          content: '没有人能让那你放弃减肥，你自己想想就会放弃了。'
        }]
      }
    },

    mounted() {
      let that = this

      let bookBoxWidth = document.body.clientWidth * 0.8
      let bookBoxHeight = bookBoxWidth / 1.5
      let bookHeight = bookBoxHeight * 0.85
      let bookWidth = bookHeight * 1.6

      $('.book-box').css({
        width: bookBoxWidth,
        height: bookBoxHeight
      })

      this.$quotationBook = $('#quotationBook')
      this.$quotationBook.booklet({
        name: null,                            // name of the booklet to display in the document title bar
        width: bookWidth,                             // container width
        height: bookHeight,                             // container height
        speed: 600,                             // speed of the transition between pages
        direction: 'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
        startingPage: 0,                               // index of the first page to be displayed
        easing: 'easeInOutQuad',                 // easing method for complete transition
        easeIn: 'easeInQuad',                    // easing method for first half of transition
        easeOut: 'easeOutQuad',                   // easing method for second half of transition

        pagePadding: 10,                              // padding for each page wrapper
        pageNumbers: true,                            // display page numbers on each page

        hovers: true,                            // enables preview pageturn hover animation, shows a small preview of previous or next page on hover
        overlays: false,                           // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
        arrows: true,                           // adds arrows overlayed over the book edges
        cursor: 'pointer',                       // cursor css setting for side bar areas

        hash: false,                           // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
        keyboard: true,                            // enables navigation with arrow keys (left: previous, right: next)

        change: function(event, data) {
          console.log(data)

          if (data.options.pageTotal - data.options.currentIndex < 4) {
            that.fetchRandomQuotations()
          }
        }
      })

      this.fetchRandomQuotations()

    }
  }
</script>

<style scoped lang="scss">


</style>

<style lang="scss">

  body {
    width: 100%;
    height: 100%;
    background: #ccc url("/static/booklet/images/wood.jpg") repeat top left;
  }

  .booklet {

    div.b-wrap {
      min-width: 100%;
      background-size: cover !important;
    }

    div.b-wrap-left {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background: #fff url("/static/booklet/images/left_bg.jpg") no-repeat top left;
    }

    div.b-wrap-right {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background: #efefef url("/static/booklet/images/right_bg.jpg") no-repeat top left;
    }

    div.b-counter {
      display: block;
      position: absolute;
      bottom: 10px;
      width: 90%;
      height: 20px;
      border-top: 1px solid #ddd;
      color: #222;
      text-align: center;
      font-size: 12px;
      padding: 5px 0 0;
      background: transparent;
      box-shadow: 0px -1px 1px #fff;
      opacity: 0.8;
    }

    .quotation-book {
      &__page {
        padding: 15px;
      }
    }
  }

  .book-box {
    position: relative;
    margin: 0 auto;
    padding-top: 30px;
    background: transparent url("/static/booklet/images/bg.png") no-repeat;
    background-size: cover;
  }

</style>
