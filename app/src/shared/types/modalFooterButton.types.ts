export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ModalFooterButtons {
  SAVE = 'Save',
  CANCEL = 'Cancel',
}

export interface ButtonType {
  id: ModalFooterButtons;
  label: string;
  type: ButtonTypes;
}
