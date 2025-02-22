import './loading.css';

/**
 * Loading component displays a loading animation with text.
 * @returns {JSX.Element} - Rendered component.
 */
const Loading = () => {
  return (
    <div className='wrap'>
      <div className='bounceball' />
      <div className='text'>LOADING...</div>
    </div>
  );
};

export default Loading;
