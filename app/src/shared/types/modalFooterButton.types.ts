export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface ButtonType {
  id: string;
  label: string;
  type: ButtonTypes;
}

export enum ModalFooterButtons {
  SAVE = 'Save',
  CANCEL = 'Cancel',
}
