import { makeMatch } from '@mv-d/toolbelt';
import { FormGeneratorOnSubmitParams } from 'react-form-builder2';
import { useRecoilValue } from 'recoil';

import { FormAnswersDataItem, formAnswersState } from '../../shared';
import { PreviewContext } from './preview.context';
import { RenderTags } from './renderers';

const FORM_RENDERERS = makeMatch(
  {
    tags: RenderTags,
  },
  null,
);

export function RenderAnswers() {
  const answers = useRecoilValue(formAnswersState);

  if (!answers) return null;

  // eslint-disable-next-line no-console
  console.log(answers.data);

  function renderAnswer(data: FormAnswersDataItem) {
    // TODO: switch to using element name
    const name = data.name.split('_')[0];

    const Component = FORM_RENDERERS[name];

    return (
      <PreviewContext.Provider value={{ data }}>
        <Component />
      </PreviewContext.Provider>
    );
  }

  return <div>{answers.data.map(renderAnswer)}</div>;
}
