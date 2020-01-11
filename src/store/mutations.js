import * as types from './mutation-types'

const mutations = {
  [types.PLATFORM_CODE](state, platformCode) {
    state.platformCode = platformCode
  },
  [types.SMSDIALOG_VISIBLE](state, smsDialogVisible) {
    state.smsDialogVisible = smsDialogVisible
  },
  [types.PLAT_FORM](state, platform) {
    state.platform = platform
  },
  [types.DIALOG_TITLE](state, dialogTitle) {
    state.dialogTitle = dialogTitle
  },
  [types.CHECKED_SELECTATTR](state, checkedselectAttr) {
    state.checkedselectAttr = checkedselectAttr
  },
  [types.SELECT_ATTR](state, selectAttr) {
    state.selectAttr = selectAttr
  },
  [types.PLATFORMCODE_STEP](state, platformCodeStep) {
    state.platformCodeStep = platformCodeStep
  },
}

export default mutations