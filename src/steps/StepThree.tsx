import React from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";

export default function StepThree() {
  const { goNext } = useWizard();

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center mt-8 px-4">
        <h1 className="text-[24px] font-bold mb-4 text-gray-900">Step 3</h1>
        <p className="text-[16px] mb-6 text-center text-gray-800">
          Cliche bushwick kinfolk ethical, kitsch salvia wolf hammock. Cliche
          health goth crucifix, vinyl cold-pressed beard af ugh post-ironic
          hashtag enamel pin you probably haven&apos;t heard of them waistcoat.
          Jean shorts fanny pack hashtag, celiac pork belly mukbang 8-bit
          vaporware tote bag. Ugh vape butcher blackbird spyplane cardigan
          helvetica YOLO deep v hammock cloud bread. Retro lyft bitters
          sustainable. Bushwick blackbird spyplane crucifix banjo cred keytar
          vegan stumptown, JOMO grailed taxidermy gluten-free typewriter.
        </p>
      </div>

      <div className="w-full max-w-md px-4 mb-6">
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}
