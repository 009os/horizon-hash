type Props = {
  name: string;
  picture: string;
  textColor?: string;
};

const Avatar = ({ name, picture, textColor = "white" }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-xl font-bold" style={{ color: textColor }}>{name}</div>
    </div>
  );
};

export default Avatar;
