import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export function NotificationDialog({ open, handleOpen }: any) {
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* <Button
        onClick={handleOpen}
        className="w-full"
        {...({} as React.ComponentProps<typeof Button>)}
      >
        Place Order
      </Button> */}
      <Dialog
        {...({
          size: "xl",
          open: open,
          handler: handleOpen,
          title: "Dialog Title",
          color: "blue",
          translate: "yes",
          slot: undefined,
          style: {},
        } as any)}
      >
        <DialogHeader
          {...({} as React.ComponentProps<typeof DialogHeader>)}
          className="grid place-items-center"
        >
          <Typography
            variant="h5"
            color="red"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody
          divider
          className="grid place-items-center gap-4"
          {...({} as React.ComponentProps<typeof DialogBody>)}
        >
          <img
            src="https://bookwindow.in/assets/images/logo.png"
            alt="logo"
            className="h-16 w-40"
          ></img>

          <Typography
            className="text-center font-normal text-gray-600"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            your shipping payment failed, it&apos;s likely due to issues with
            your payment method, such as insufficient funds, an expired card, or
            a problem with the payment gateway
          </Typography>
        </DialogBody>
        <DialogFooter
          className="space-x-2"
          {...({} as React.ComponentProps<typeof DialogFooter>)}
        >
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
            {...({} as React.ComponentProps<typeof Button>)}
          >
            close
          </Button>
          <Button
            variant="gradient"
            onClick={handleOpen}
            {...({} as React.ComponentProps<typeof Button>)}
          >
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
