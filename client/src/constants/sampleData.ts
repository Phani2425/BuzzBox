import { Message } from "@/Types/types";

export const SampleChats = [
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Doe',
        _id: '1',
        lastMessage: 'Hello',
        groupChat: false,
        members:['1','2','3']
    },
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John boi',
        _id: '2',
        lastMessage: 'Hello',
        groupChat: false,
        members:['1','2']
    }
]

export const Sampleusers = [
    {
      id: "1",
      username: "rombor",
      avatar: "https://avatars",
    },
    {
      id: "2",
      username: "phani",
      avatar: "https://avatars",
    },
    {
      id: "3",
      username: "bhusan",
      avatar: "https://avatars",
    },
    {
      id: "4",
      username: "mohanty",
      avatar: "https://avatars",
    },
  ];

export const sampleNotifications = [
    {
        sender:{
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Doe'
        },
        _id: '1'
    },
    {
        sender:{
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'mary zane'
        },
        _id: '2'
    },
    {
        sender:{
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'jane Doe'
        },
        _id: '3'
    }
]

  // Fake messages for visualization
  export const messages: Message[] = [
    {
        attachments: [
            {
                
                public_id: "abcde",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        content: "Check out this profile picture!",
        _id: "msg1",
        sender: {
            _id: "1",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:00:00.000Z"
    },
    {
        attachments: [],
        content: "Hey, how's your day going?",
        _id: "msg2",
        sender: {
            _id: "2",
            username: "alex"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:01:00.000Z"
    },
    {
        attachments: [],
        content: "Pretty good! Working on that new project",
        _id: "msg3",
        sender: {
            _id: "1",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:02:00.000Z"
    },
    {
        attachments: [
            {
                
                public_id: "efghi",
                url: "https://imgv3.fotor.com/images/side/Overlay-images-and-adjust-transparency-to-create-double-exposure-effects-using-Fotor.jpg"
            },
        ],
        content: "Here's what I've done so far",
        _id: "msg4",
        sender: {
            _id: "1",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:03:00.000Z"
    },
    {
        attachments: [],
        content: "Wow, that looks amazing! Great progress 👍",
        _id: "msg5",
        sender: {
            _id: "2",
            username: "alex"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:04:00.000Z"
    },
    {
        attachments: [
            {
                
                public_id: "efghi",
                url: "https://lfs.creativefabrica.com/web/pages/studio/features/overlay-images/Studio_Tool%20Page_Overlay%20Images%20-%20paragraph%201.png"
            },
        ],
        content: "",
        _id: "msg4",
        sender: {
            _id: "1",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:03:00.000Z"
    }, {
        attachments: [
            {
                
                public_id: "efghi",
                url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
        ],
        content: "see this",
        _id: "msg4",
        sender: {
            _id: "2",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:03:00.000Z"
    }, {
        attachments: [
            {
                
                public_id: "efghi",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
        ],
        content: "",
        _id: "msg4",
        sender: {
            _id: "1",
            username: "rombor"
        },
        chat: "chatId",
        createdAt: "2024-03-15T10:03:00.000Z"
    },
];