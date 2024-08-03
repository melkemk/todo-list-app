// import { GetStaticProps, NextPage } from 'next';

// interface DataProps {
//   data: {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
//   };
// }

// const DataPage: NextPage<DataProps> = ({ data }) => {
//   return (
//     <div>
//       <h1>Data Page</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps<DataProps> = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//     revalidate: 10, 
//   };
// };

// export default DataPage;
// // 