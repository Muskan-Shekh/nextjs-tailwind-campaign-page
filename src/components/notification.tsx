import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export function NotificationDialog() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="w-full"
        {...({} as React.ComponentProps<typeof Button>)}
      >
        Place Order
      </Button>
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
        <DialogHeader {...({} as React.ComponentProps<typeof DialogHeader>)}>
          <Typography
            variant="h5"
            color="blue-gray"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography
            color="red"
            variant="h4"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            You should read this!
          </Typography>
          <Typography
            className="text-center font-normal text-red-400"
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
