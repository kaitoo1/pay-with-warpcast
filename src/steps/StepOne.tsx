import React from "react";
import { useWizard } from "~/providers/WizardContext";
import Button from "~/components/Button";
import { useFrameSDK } from "~/providers/FrameSDKContext";
import { useSearchParams } from "next/navigation";

export default function StepOne() {
  const { goNext } = useWizard();
  const { context, signInResult, signInError, isValidFrameContext } =
    useFrameSDK();

  const searchParams = useSearchParams();
  console.log(searchParams.get("testParam"));

  return (
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex flex-col items-center mt-8 px-4">
        <h1 className="text-[24px] font-bold mb-4 text-gray-900">Step 1</h1>
        {searchParams.get("testParam")}
        <p className="text-[16px] mb-6 text-center text-gray-800">
          Fam craft beer crucifix shoreditch, solarpunk four loko skateboard
          offal brunch vegan VHS pok pok. Tumblr gochujang sriracha roof party.
          Pitchfork snackwave distillery waistcoat, 8-bit mukbang tote bag green
          juice. Blackbird spyplane yes plz man bun locavore, green juice shabby
          chic DSA 8-bit meditation forage helvetica iceland +1. Grailed
          chicharrones tonx, viral yuccie af irony beard flexitarian succulents
          hell of. Godard jean shorts pug tonx, hot chicken YOLO truffaut
          polaroid poutine sriracha affogato.
        </p>
        {isValidFrameContext === false && (
          <pre className="bg-gray-100 p-2 rounded-lg whitespace-pre-wrap break-all text-[16px] text-left min-w-0">
            Not a valid frame context; you may be on desktop
          </pre>
        )}
        {signInResult && (
          <pre className="bg-gray-100 p-2 rounded-lg whitespace-pre-wrap break-all text-[16px] text-left min-w-0">
            {JSON.stringify(
              {
                fid: context?.user.fid,
                username: context?.user.username,
                displayName: context?.user.displayName,
                pfpUrl: context?.user.pfpUrl,
              },
              null,
              2
            )}
          </pre>
        )}
        {signInError && (
          <div className="text-red-500 text-[16px] mb-3">
            Error: {signInError.message}
          </div>
        )}
      </div>

      <div className="w-full max-w-md px-4 mb-6">
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
}
