import ValuesPush from './use/values-push.js'
import GitLog from './sections/git-log.vue'
import GitRevisions from './sections/git-revisions.vue'

panel.plugin("wottpal/git", {
  use: [ValuesPush],
  sections: {
    gitLog: GitLog,
    gitRevisions: GitRevisions
  }
})
