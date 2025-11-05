import { Chip } from "@/components/ui/chip";

type SkillChipsProps = {
  skills: string[];
  className?: string;
};

export default function SkillChips({ skills, className = "" }: SkillChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((s) => (
        <Chip key={s} variant="skill" className="text-[#FF6000]">
          {s}
        </Chip>
      ))}
    </div>
  );
}
