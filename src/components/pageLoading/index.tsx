import style from "./style.module.css";

const LoadingSpinner = () => {
  return (
    <div className=" h-full flex justify-center items-center">
      <div>
        <span className={style.i}></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
