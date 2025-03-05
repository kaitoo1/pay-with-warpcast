import React from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";

export default function StepTwo() {
  const { goNext } = useWizard();

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center mt-8 px-4">
        <h1 className="text-[24px] font-bold mb-4 text-gray-900">Step 2</h1>
        <p className="text-[16px] mb-6 text-center text-gray-800">
          Vinyl distillery yuccie 3 wolf moon church-key kickstarter cloud bread
          man braid biodiesel hella. Occupy swag jawn bespoke vexillologist
          distillery. Helvetica hoodie meggings, XOXO fanny pack next level vape
          tofu. Tbh art party tonx, quinoa knausgaard you probably haven&apos;t
          heard of them blog. Meh farm-to-table jianbing +1 Brooklyn semiotics
          lomo gluten-free banh mi fanny pack blackbird spyplane bruh. Deep v
          authentic wayfarers iceland. Bushwick palo santo 3 wolf moon
          mumblecore, humblebrag crucifix truffaut migas vibecession.
        </p>
      </div>

      <div className="w-full max-w-md px-4 mb-6">
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}
