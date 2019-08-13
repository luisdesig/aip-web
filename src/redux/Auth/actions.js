const actions = {
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    CHECK_PASSWORD: 'CHECK_PASSWORD',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FEDEREATION: 'LOGIN_FEDEREATION',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    LOGOUT: 'LOGOUT',
    CHANGEMODALOFF: 'CHANGEMODALOFF',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    SIDEBAR_USER: 'SIDEBARUSER',
    CLEAN_MODAL: 'CLEAN_MODAL',
    checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
    login: payload => ({
      type: actions.LOGIN_REQUEST,
      payload
    }),
    loginfederate: () => ({
      type: actions.LOGIN_FEDEREATION
    }),
    verifiquePassword : (data) => ({
      type: actions.CHECK_PASSWORD,
      data: data
    }),
    changePassword: payload => ({
      type: actions.CHANGE_PASSWORD,
      payload
    }),
    logout: () => ({
      type: actions.LOGOUT
    }),
    handleModalOff: () => ({
      type: actions.CHANGEMODALOFF
    }),
    handleCleanModal: () => ({
      type: actions.CLEAN_MODAL
    })
  };
  export default actions;