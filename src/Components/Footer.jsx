const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <p className="text-black">
        <span className="font-semibold text-xs md:text-sm  text-gray-700">
          Ripeseed.io © 2023
        </span>{" "}
        -{" "}
        <a
          href="/"
          className="hover:underline text-xs md:text-sm  text-gray-700"
        >
          info@ripeseed.io
        </a>
      </p>
    </div>
  );
};

export default Footer;
