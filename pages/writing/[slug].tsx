import Layout from '../../components/Layout';
import { getAllWriting, getWritingBySlug } from '../../lib/find-writing';
import markdownToHtml from '../../lib/code-highlighting';
import parse from 'html-react-parser';

interface Props {
  content: string;
  meta: Record<string, string>;
}

const Writing = ({ meta, content }: Props) => {
  return <Layout title={meta.title}>{parse(content)}</Layout>;
}

export default Writing;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const writing = getWritingBySlug(params.slug);
  const content = await markdownToHtml(writing.content || '');

  return {
    props: {
      ...writing,
      content
    }
  };
}

export async function getStaticPaths() {
  const docs = getAllWriting();

  return {
    paths: docs.map((doc) => {
      return {
        params: {
          slug: doc.slug
        }
      };
    }),
    fallback: 'blocking'
  };
}