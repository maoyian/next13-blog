import Head from 'next/head'
// import PropTypes, { string } from 'prop-types'
// head.propTypes = {
//   title: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
// }
head.defaultProps = {
  title: '我的博客',
}
export default function head({ title, name, content }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name={name} content={content} />
    </Head>
  )
}
