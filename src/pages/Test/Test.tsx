import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Test.module.scss';
import doc from '../../docs/doc.md';
import gfm from 'remark-gfm';

const base = process.env.PUBLIC_URL === '/genshin_docs';

const renderers = {
  image: (props: any) => {
    return(
      <div className={styles.imageWrapper}>
        <img alt='Where is description?' src={base ? '/genshin_docs' + props.src : props.src} />
        <div className={styles.imageDescription}>{ props.alt }</div>
      </div>
    );
  }
};

interface Props{
  page: any;
}

const Test = ({ page } : Props) => {
  const [text, setText] = useState('');

  import('../../docs/' + page.doc).then(module =>
    fetch(module.default).then(res => res.text()).then(resText => setText(resText))
  );

  return(
    <div className={styles.wrapper}>
      <ReactMarkdown renderers={renderers} plugins={[gfm]}>{ text }</ReactMarkdown>
    </div>
  )
};

export default Test;