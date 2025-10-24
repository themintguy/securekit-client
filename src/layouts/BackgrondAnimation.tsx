import { motion } from "framer-motion";

const BackgrondAnimation = () => {
  return (
    <>
      <motion.div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute w-40 h-40 bg-redddd rounded-full opacity-30 -top-10 -left-10"
          animate={{ y: [0, 25, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-greenyy rounded-full opacity-20 -bottom-20 right-10"
          animate={{ y: [0, -35, 0], x: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-56 h-56 bg-blueee rounded-full opacity-25 top-1/3 left-1/2"
          animate={{ y: [0, 20, 0], x: [0, 20, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>
    </>
  );
}

export default BackgrondAnimation