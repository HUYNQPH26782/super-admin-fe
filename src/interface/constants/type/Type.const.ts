export const TYPE_MANAGEMENT = {
  CODE_DEMO: "codeDemo",
  AUTH_GUARD: "AuthGuard",
  GUEST_GUARD:"GuestGuard",
  MODE_CREATE: "modeCreate",
  MODE_UPDATE: "modeUpdate",
  MODE_DETAIL: "modeDetail",
  MODE_DELETE: "modaeDelete",
  DEFAULT_SIZE: 10,
  DEFAULT_CURRENT: 0,
  DEFAULT_TOTAL: 0,
  STATUS_SUCCESS: 200,
  STATUS_ERROR_400: 400,
  STATUS_ERROR_404: 404
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type ModalType = 'success' | 'info' | 'warning' | 'error' | 'confirm';
