const Item = ({ label, url }: { label: string; url: string }) => {
  return (
    <a href={url} target='_blank' className='hover:underline'>
      {label}
    </a>
  );
};

export default Item;
