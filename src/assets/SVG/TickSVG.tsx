interface TickSVGInterface {
  width: number;
  height: number;
  fill: string;
}
export const TickSVG = ({ width, height, fill }: TickSVGInterface) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g id="Complete">
          {" "}
          <g id="tick">
            {" "}
            <polyline fill="none" points="3.7 14.3 9.6 19 20.3 5" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
