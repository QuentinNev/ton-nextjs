import { NextResponse } from "next/server";

import { bot } from '../../../bot';
import { CreateInvoiceLinkParams } from "gramio";

export async function GET() {
    const params: CreateInvoiceLinkParams = {
        title: 'AKATON',
        description: 'Yeboy',
        currency: 'XTR',
        prices: [{
            label: 'XTR',
            amount: 1
        }],
        payload: JSON.stringify({ test: 'test' })
    }

    const link = await bot.api.createInvoiceLink(params);

    return NextResponse.json({ message: 'succes', link });
}