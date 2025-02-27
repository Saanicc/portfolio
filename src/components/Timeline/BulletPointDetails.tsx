import { Project } from "@/lib/data/work";

const BulletPointDetails = ({
  bulletPoints,
}: {
  bulletPoints: Project["bulletPointDetails"];
}) => {
  if (!bulletPoints) return null;

  return (
    <>
      <ul className="list-disc list-inside pl-2 my-1">
        {bulletPoints.map((point) => (
          <li key={point} className="text-gray-300 text-sm">
            {point.includes(":") ? (
              <>
                <strong>{point.split(":")[0]}:</strong>
                <span className="pb-2 block">{point.split(":")[1]}</span>
              </>
            ) : (
              point
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BulletPointDetails;
