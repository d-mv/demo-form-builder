import { makeMatch } from '@mv-d/toolbelt';
import { useRecoilValue } from 'recoil';

import { FormAnswersDataItem, formAnswersState, LazyLoad } from '../../shared';
import { PreviewContext } from './preview.context';
import { Checkboxes, Header, Paragraph, Tags } from './renderers';

const FORM_RENDERERS = makeMatch(
  {
    Tags: Tags,
    Header: Header,
    Paragraph: Paragraph,
    Checkboxes: Checkboxes,
    //  'Label',
    //  'LineBreak',
    //  'Dropdown',
    //  'RadioButtons',
    //  'TextInput',
    //  'EmailInput',
    //  'NumberInput',
    //  'PhoneNumber',
    //  'TextArea',
    //  'TwoColumnRow',
    //  'Image',
    //  'Rating',
    //  'DatePicker',
    //  'Signature',
    //  'HyperLink',
    //  'Download',
    //  'Range',
    //  'Camera',[]
    //  'FileUpload',
  },
  () => null,
);

export function RenderAnswers() {
  const answers = useRecoilValue(formAnswersState);

  if (!answers) return null;

  function renderAnswer(data: FormAnswersDataItem) {
    const Component = FORM_RENDERERS[data.element];

    return (
      <PreviewContext.Provider key={data.id} value={{ data }}>
        <LazyLoad>
          <Component />
        </LazyLoad>
      </PreviewContext.Provider>
    );
  }

  return <div>{answers.data.map(renderAnswer)}</div>;
}
