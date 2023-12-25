export interface MessageModel 
{
    id: string;
    user_id: string;
    avatar: string;
    name: string;
    message: string;
    message_date: string;
    message_time: string;
    status: 'sent' | 'read' | 'unread' | 'viewed';
}
