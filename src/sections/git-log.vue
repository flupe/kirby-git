<template>
  <section class="k-gitlog-section">
    <k-headline>{{ headline }}</k-headline>

    <template v-if="log.length">
      <div class="k-gitlog-table">
        <div class="k-gitlog-row" v-for="item in paginatedLog" :key="item.hash">
          <p class="">
            <span class="k-gitlog-item-label">{{ item.commitType }}</span>
            <span class="k-gitlog-item-path" :title="item.commitSubject.join(' / ')">
              <span v-for="component in item.commitSubject" v-html="component" />
            </span>
          </p>

          <p class="">
            <span class="k-gitlog-item-label">Author</span>
            <span :title="item.author">{{ item.author }}</span>
          </p>

          <p class="">
            <span class="k-gitlog-item-label">Date</span>
            <span :title="item.dateFormatted">{{ item.dateFormatted }}</span>
          </p>
        </div>
      </div>

      <k-pagination
        v-bind="paginationOptions"
        ref="pagination"
        @paginate="paginate($event)" />
    </template>

    <k-box v-else>
      No commits or no repository found.
    </k-box>
  </section>
</template>

<script>
export default {

  data: function() {
    return {
      headline: "",
      limit: 5,
      kirbyOnly: true,
      log: [],
      paginatedLog: []
    };
  },

  computed: {

    paginationOptions() {
      return {
        limit: this.limit,
        align: "center",
        details: true,
        keys: this.log.map( commit => commit.hash ),
        total: this.log.length,
        hide: false,
      }
    }

  },

  created: function() {
    this.load().then(response => {
      this.limit = response.limit
      this.headline = response.headline
      this.kirbyOnly = response.kirbyOnly

      this.processLog(JSON.parse(JSON.stringify(response.gitLog)))
      this.paginate()
    })
  },

  methods: {

    paginate(event) {
      let start = 0
      let end = Math.min(this.log.length, this.limit)

      if (event) {
        start = event.start - 1
        end = event.end
      }

      this.paginatedLog = this.log.slice(start, end)
    },

    processLog(log) {
      this.log = log.map(commit => {
        // Get Author
        const byString = "By: "
        const byLocation = commit.message.indexOf(byString)

        if (byLocation != -1) {
          commit.author = commit.message.substring(byLocation + byString.length);
          commit.message = commit.message.substring(0, byLocation);
          commit.authorSource = "Kirby";
        } else {
          commit.authorSource = "Git";
        }

        // Get Page & Commit-Type
        const actionPattern = /(.*):\w*(.*)\w*/
        const match = actionPattern.exec(commit.message)

        if (commit.authorSource == "Kirby" && match && match.length >= 2) {
          commit.commitType = match[1]
          commit.commitSubject = match[2].trim().split('/')
          commit.commitSubject = commit.commitSubject.map(component => component.replace('None', '<span class="k-structure-item-path__none">None</span>'))
        }
        else {
          commit.commitType = "Developer Commit"
          commit.commitSubject = [ commit.message ]
        }

        return commit

      }).filter(commit => {
        // Filter out non-kirby commits if `kirbyOnly` is set
        return commit.authorSource == "Kirby" || !this.kirbyOnly
      })
    }

  }
}
</script>

<style>
.k-gitlog-section .k-headline {
  margin-bottom: 10px;
}
.k-gitlog-table {
    width:100%;
    background:#fff;
    font-size:.875rem;
    border-spacing:0;
    -webkit-box-shadow:rgba(22,23,26,.05) 0 2px 5px;
    box-shadow:0 2px 5px rgba(22,23,26,.05)
  }

  .k-gitlog-table div {
    box-sizing: border-box;
  }

  .k-gitlog-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    border-bottom:1px solid #efefef;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  .k-gitlog-row p {
    padding: .75rem;
  }

  [dir=ltr] .k-gitlog-row p {
    border-right:1px solid #efefef;
  }
  [dir=rtl] .k-gitlog-row p {
    border-left:1px solid #efefef;
  }

  .k-gitlog-item-label {
    opacity: .7;
    font-size: .8rem;
    display: block;
  }

  [dir=ltr] .k-gitlog-table p { text-align:left }
  [dir=rtl] .k-gitlog-table p { text-align:right }

  [dir=ltr] .k-gitlog-row p:last-child {
    border-right:0
  }
  [dir=rtl] .k-gitlog-row p:last-child {
    border-left:0
  }
  .k-gitlog-row:last-child {
    border-bottom:0
  }

  .k-gitlog-table .k-gitlog-row:hover p {
    background:hsla(0,0%,93.7%,.25)
  }

  .k-gitlog-item-path span:last-of-type { font-weight:600; }
  .k-gitlog-item-path span:not(:last-of-type) { opacity:.75; }
  .k-gitlog-item-path span:not(:last-of-type):after{
    opacity:.25;
    font-weight:400;
    content:" / ";
  }
</style>
