const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <p className="text-black">
        <span className="font-semibold text-xs md:text-sm  text-gray-700 dark:text-gray-500">
          Ripeseed.io © 2023
        </span>{" "}
        -{" "}
        <a
          href="mailto:info@ripseed.io"
          className="hover:text-[#199f87] text-xs md:text-sm  text-gray-700 dark:text-gray-500"
        >
          info@ripeseed.io
        </a>
      </p>
    </div>
  );
};

export default Footer;
