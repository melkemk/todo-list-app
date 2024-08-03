import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

interface DataProps {
  data: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

const DataPage: NextPage<DataProps> = ({ data }) => {
  return (
    <div>
      <h1>Data Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of items you want to generate paths for
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: { id: number }) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<DataProps> = async (context) => {
  console.log(context.params?.id);
  const id = context.params?.id as string;

  // Fetch data for the specific id
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
};

export default DataPage;
