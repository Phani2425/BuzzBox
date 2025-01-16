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

export const groups = [
    {
      id: "1",
      name: "Project Alpha",
      creator: "1",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "2", name: "Jane Smith", avatar: "https://ui-avatars.com/api/?name=Jane+Smith" },
        { id: "3", name: "Bob Wilson", avatar: "https://ui-avatars.com/api/?name=Bob+Wilson" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Project+Alpha",
      lastActive: "2 mins ago"
    },
    {
      id: "2",
      name: "Family Group",
      creator: "2",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "4", name: "Mary Johnson", avatar: "https://ui-avatars.com/api/?name=Mary+Johnson" },
        { id: "5", name: "David Brown", avatar: "https://ui-avatars.com/api/?name=David+Brown" },
        { id: "6", name: "Sarah Davis", avatar: "https://ui-avatars.com/api/?name=Sarah+Davis" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Family+Group",
      lastActive: "5 mins ago"
    },
    {
      id: "3",
      name: "Gaming Squad",
      creator: "1",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "7", name: "Mike Gaming", avatar: "https://ui-avatars.com/api/?name=Mike+Gaming" },
        { id: "8", name: "Alex Pro", avatar: "https://ui-avatars.com/api/?name=Alex+Pro" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Gaming+Squad",
      lastActive: "1 hour ago"
    },
    {
      id: "4",
      name: "Work Team",
      creator: "3",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "9", name: "Emma White", avatar: "https://ui-avatars.com/api/?name=Emma+White" },
        { id: "10", name: "James Black", avatar: "https://ui-avatars.com/api/?name=James+Black" },
        { id: "11", name: "Lisa Green", avatar: "https://ui-avatars.com/api/?name=Lisa+Green" },
        { id: "12", name: "Tom Brown", avatar: "https://ui-avatars.com/api/?name=Tom+Brown" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Work+Team",
      lastActive: "3 hours ago"
    },
    {
      id: "5",
      name: "College Friends",
      creator: "1",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "13", name: "Ryan Cool", avatar: "https://ui-avatars.com/api/?name=Ryan+Cool" },
        { id: "14", name: "Kate Swift", avatar: "https://ui-avatars.com/api/?name=Kate+Swift" }
      ],
      avatar: "https://ui-avatars.com/api/?name=College+Friends",
      lastActive: "1 day ago"
    },
    {
      id: "6",
      name: "Book Club",
      creator: "4",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "15", name: "Anna Read", avatar: "https://ui-avatars.com/api/?name=Anna+Read" },
        { id: "16", name: "Paul Page", avatar: "https://ui-avatars.com/api/?name=Paul+Page" },
        { id: "17", name: "Lucy Books", avatar: "https://ui-avatars.com/api/?name=Lucy+Books" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Book+Club",
      lastActive: "2 days ago"
    },
    {
      id: "7",
      name: "Fitness Group",
      creator: "1",
      members: [
        { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe" },
        { id: "18", name: "Jim Fit", avatar: "https://ui-avatars.com/api/?name=Jim+Fit" },
        { id: "19", name: "Helen Health", avatar: "https://ui-avatars.com/api/?name=Helen+Health" }
      ],
      avatar: "https://ui-avatars.com/api/?name=Fitness+Group",
      lastActive: "1 week ago"
    }
  ];