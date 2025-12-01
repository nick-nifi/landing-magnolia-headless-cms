"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { SafeImage } from "@/components/ui/safe-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import confirmIcon from "../public/assets/confirm.png";

interface DisclaimerProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

function Contents({ onCancel, onConfirm }: DisclaimerProps) {
  return (
    <div
      className="
      bg-white box-border flex flex-col gap-20 
       items-start justify-start
       px-8 sm:px-12 lg:px-20 py-16 
       relative w-full
      "
    >
      {/* Content Section */}
      <div className="flex flex-col gap-8 w-full">
        <div className="mx-auto w-full max-w-[900px]">
          {/* Header */}

          <Typography variant="h2" weight="light">
            Disclaimer
          </Typography>

          {/* Disclaimer Text */}
          <div className="flex flex-col gap-4 mt-4">
            <Typography variant="body-large" weight="light">
              The information, materials and research articles found within
              UTRADE Research are provided strictly for general informational
              and educational purposes only, and should not be interpreted as
              (i) financial, investment, securities or other advice, (ii) any
              form of solicitation, offer or recommendation to buy, sell or
              dispose of any investment, to engage in any transaction or to
              purchase any product or service described in such information or
              materials, or (iii) financial research.
            </Typography>

            <Typography variant="body-large" weight="light">
              The content does not take into account individual investor
              financial circumstances, investment objectives or particular needs
              and UOB Kay Hian Private Limited ("UOBKH") does not advise on the
              merits or suitability of particular equities or other investment
              products. Before trading in equities or other investment products,
              you should consider consulting a professional financial adviser,
              who can provide advice on whether a particular investment suits
              your financial goals and can provide you with a full understanding
              of the equities or other investment products you may choose to
              transact in. In the event that you choose not to seek independent
              financial advice, you should consider carefully whether the
              investment products are suitable for you.
            </Typography>

            <Typography variant="body-large" weight="light">
              The information and views in the materials and research articles
              on this website, including any opinions or forecasts expressed
              herein, have been obtained or derived from sources believed by
              UOBKH to be reliable. However, UOBKH makes no representation or
              warranty as to the accuracy, adequacy, timeliness or completeness
              of such sources nor their fitness for any particular purpose, and
              UOBKH accepts no liability whatsoever for any loss or damage of
              any kind (whether or not foreseeable) arising (whether directly or
              indirectly) from any errors or omissions in or the use of or
              reliance on the materials and research articles. UOBKH makes no
              commitment to update or correct the information published on
              UTRADE Research.
            </Typography>

            <Typography variant="body-large" weight="light">
              The use of UTRADE Research is subject to Singapore law, this
              disclaimer and the Disclaimer on Risk Factors for Equities
              (collectively, the "Disclaimers"). By accessing or using this
              website or any information, materials or research articles
              contained in UTRADE Research, you acknowledge that you have read
              and understood the Disclaimers and accept and agree to be bound by
              the Disclaimers.
            </Typography>
          </div>

          {/* Button Section */}
          <div className="flex gap-8 justify-start mt-6">
            <Button
              variant="outline"
              color="default"
              onClick={onCancel}
              className="border-accent text-accent"
            >
              Cancel <span className="ml-1">×</span>
            </Button>

            <Button
              variant="outline"
              color="default"
              onClick={onConfirm}
              className="border-accent text-accent flex items-center gap-2.5"
            >
              Confirm
              <SafeImage
                src={confirmIcon.src}
                alt="confirm"
                className="w-3.25 h-2.125"
                style={{ width: 13, height: 9 }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Disclaimer({ onCancel, onConfirm }: DisclaimerProps) {
  return (
    <Dialog open={true}>
      <DialogContent
        className="
          w-full max-w-[90vw] lg:max-w-[1200px] 
          max-h-[90vh] p-0 overflow-hidden
        "
      >
        <ScrollArea className="max-h-[80vh] w-full">
          <Contents onCancel={onCancel} onConfirm={onConfirm} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
