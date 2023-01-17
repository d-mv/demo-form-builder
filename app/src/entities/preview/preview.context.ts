import { as } from '@mv-d/toolbelt';
import { createContext } from 'react';
import { FormGeneratorOnSubmitParams } from 'react-form-builder2';
import { FormAnswersDataItem } from '../../shared';

interface PreviewContextType {
  data: FormAnswersDataItem;
}

export const PreviewContext = createContext<PreviewContextType>(as<PreviewContextType>({}));

PreviewContext.displayName = 'PreviewContext';
