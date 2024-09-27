import FormField from "./FormField";

const FormDetails = () => {

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto bg-[#EEF9FF]">
      <div className=" lg:w-[65%] m-auto lg:p-16 md:p-4 sm:w-[95%] xs:w-[95%] sm:h-full xs:h-full xs:p-4 sm:p-4">
        <div className="border-b border-gray-200 bg-white rounded-md sm:h-full xs:h-full">
          <FormField />
        </div>
      </div>
    </div>
  );
};

export default FormDetails;
