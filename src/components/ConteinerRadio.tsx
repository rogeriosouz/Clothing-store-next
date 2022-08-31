type ContainerProps = {
  onChange: any;
  color: string;
  name: string;
};

export function ContainerRadio({ onChange, color, name }: ContainerProps) {
  return (
    <div className="sm:text-sm text-xs flex items-center bg-black text-white rounded">
      <label className="pl-2 pt-1 pb-1 pr-2 flex items-center gap-2">
        <input
          onChange={(e) => onChange(e.target.value)}
          type="radio"
          value={color}
          name={name}
        />
        <p className="font-bold">{color}</p>
      </label>
    </div>
  );
}
