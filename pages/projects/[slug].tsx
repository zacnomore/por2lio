import Layout from '../../components/Layout';
import { getAllWriting, getWritingBySlug as getProjectBySlug } from '../../lib/find-writing';
import markdownToHtml from '../../lib/code-highlighting';
import parse from 'html-react-parser';

interface Props {
  content: string;
  meta: Record<string, string>;
}

const Project = ({ meta, content }: Props) => {
  return <Layout title={meta.title}>{parse(content)}</Layout>;
}

export default Project;
// TODO: Dedupe
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const writing = getProjectBySlug(params.slug, 'project');
  const content = await markdownToHtml(writing.content || '');

  return {
    props: {
      ...writing,
      content
    }
  };
}

export async function getStaticPaths() {
  const docs = getAllWriting('project');

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