import Form from '../Form';
import Skeleton from '../../Skeleton/Skeleton';

const AsyncForm = ({ isLoading, fields, className = '', ...props }) => {
  const renderFieldsSkeleton = (fields) => {
    return Object.keys(fields).map((key, index) => {
      const field = fields[key];
      if (field.fields) {
        return (
          <div key={index} className={field.className}>
            {renderFieldsSkeleton(field.fields)}
          </div>
        );
      }
      if (field.element) {
        return (
          <Skeleton key={index} type="rounded" className={field.props?.className} width="none" />
        );
      }
      console.log(key);

      return (
        <Skeleton
          key={index}
          type="rounded"
          width="100%"
          height="2.5rem"
          style={{ marginBottom: '0.8rem' }}
        />
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <div className={className}>{renderFieldsSkeleton(fields)}</div>
      ) : (
        <Form className={className} fields={fields} {...props} />
      )}
    </>
  );
};

export default AsyncForm;
