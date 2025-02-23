import Form from '../../core/Form/Form';
import Skeleton from '../../core/Skeleton/Skeleton';

const AsyncForm = ({ isPending, fields, className = '', ...props }) => {
  return (
    <>
      {isPending ? (
        <div className={className}>
          {Object.keys(fields).map((_, index) => (
            <Skeleton key={index} type="input" width="100%" height="2.5rem" />
          ))}
        </div>
      ) : (
        <Form className={className} fields={fields} {...props} />
      )}
    </>
  );
};

export default AsyncForm;
